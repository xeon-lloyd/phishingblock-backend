const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const setting = require(`./setting.js`);

module.exports = {
	appRoot: path.dirname(require.main.filename || process.mainModule.filename),

	/* 경로 유효범위 체크(상위 폴더 이동 방지) */
	securePath: function(src=''){
		let stack = [];

		src = src.split('/');

		for(let i=0;i<src.length;i++){
			if(src[i]=='') continue;

			if(src[i]=='..'){
				stack.pop();
			}else{
				stack.push(src[i]);
			}
		}

		return stack.join('/');
	},

	/* DB(mysql) 관련 */
	mysql: {
		/* DB 연결 */
		connection: {},
		connect: async function(db){
			setting.mysql[db].enableKeepAlive = true;

			const mysql = require('mysql2/promise');
			this.connection[db] = mysql.createPool(setting.mysql[db]);;
		},

		camelToSnake: str => setting.sqlCamelToSnakeMapping?str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`):str,

		/* select 실행 */
		select: async function(db, select, table, where='', params=[], orderBy='', limit=''){
			let sql = `SELECT ${this.camelToSnake(select)} FROM ${this.camelToSnake(table)}`;
			if(where!='') sql += ` WHERE ${this.camelToSnake(where)}`;
			if(orderBy!='') sql += ` ORDER BY ${this.camelToSnake(orderBy)}`;
			if(limit!='') sql += ` LIMIT ${limit}`;

			let [result] = await this.connection[db].query(sql, params);

			return result;
		},

		/* insert 실행 */
		insert: async function(db, table, data){
			let keys = Object.keys(data);
			let params = [];
			let setter = '(';
			let value = 'VALUES('
			for(let i=0;i<keys.length;i++){
				setter += `\`${this.camelToSnake(keys[i])}\`, `;
				value += `?, `;
				params.push(data[keys[i]]);
			}

			setter = setter.substr(0, setter.length-2)+')';
			value = value.substr(0, value.length-2)+')';

			let sql = `INSERT INTO ${this.camelToSnake(table)} ${setter} ${value}`;

			let [result] = await this.connection[db].query(sql, params);

			return result;
		},

		insertMany: async function(db, table, name, data){
			let sql = `INSERT INTO ${this.camelToSnake(table)} (${this.camelToSnake(name)}) VALUES ?`;

			try{
				let [result] = await this.connection[db].query(sql, [data]);
			}catch(e){
				console.log(e)
			}
		},

		/* update 실행 */
		update: async function(db, table, data, where, Wparams){
			let keys = Object.keys(data);
			let params = [];
			let setter = 'SET ';
			for(let i=0;i<keys.length;i++){
				setter += `\`${this.camelToSnake(keys[i])}\` = ?, `;
				params.push(data[keys[i]]);
			}

			setter = setter.substr(0, setter.length-2);

			let sql = `UPDATE ${this.camelToSnake(table)} ${setter} WHERE ${where}`;

			if(Wparams!=undefined) params = params.concat(Wparams);
			
			let [result] = await this.connection[db].query(sql, params);

			return result;
		},

		/* delete 실행 */
		delete: async function(db, table, where='', params){
			let sql = `DELETE FROM ${this.camelToSnake(table)}`;
			if(where!='') sql += ` WHERE ${this.camelToSnake(where)}`;
			
			let [result] = await this.connection[db].query(sql, params);

			return result;
		},

		/* 조건 count */
		count: async function(db, table, where='', params){
			let sql = `SELECT COUNT(*) as result FROM ${this.camelToSnake(table)}`;
			if(where!='') sql += ` WHERE ${this.camelToSnake(where)}`;

			let [result] = await this.connection[db].query(sql, params);

			return parseInt(result[0].result);
		},

		/* 조건 합계 */
		sum: async function(db, select, table, where='', params){
			let sql = `SELECT SUM(${this.camelToSnake(select)}) as result FROM ${this.camelToSnake(table)}`;
			if(where!='') sql += ` WHERE ${this.camelToSnake(where)}`;

			let [result] = await this.connection[db].query(sql, params);

			return parseFloat(result[0].result) || 0;
		},

		/* sql 실행 */
		exec: async function(db, sql, params){
			let [result] = await this.connection[db].query(sql, params);

			return result;
		}
	},

	/* 암호화 관련 */
	encrypt: {
		/* 단방향 암호화 */
		oneWay: function(plainText){
			return crypto.createHmac('sha512', setting.encrypt.key).update(plainText).digest('hex');
		},

		oneWayLite: function(plainText){
			return crypto.createHmac('sha256', setting.encrypt.key).update(plainText).digest('hex');
		},

		shortHash: function(plainText, len){
			return crypto.createHash('shake256', { outputLength: len }).update(plainText).digest('hex');
		},

		/* 양방향 암호화 */
		encode: function(plainText){
			let iv = crypto.randomBytes(16);
			let cipher = crypto.createCipheriv('aes-128-cbc', setting.encrypt.key, iv);
			let encrypted = cipher.update(plainText);
			let finalBuffer = Buffer.concat([encrypted, cipher.final()]);
			let encoded = iv.toString('hex') + ':' + finalBuffer.toString('hex');

			return encoded;
		},

		/* 양방향 복호화 */
		decode: function(encoded){
			let encryptedArray = encoded.split(':');
			let iv = new Buffer.from(encryptedArray[0], 'hex');
			let encrypted = new Buffer.from(encryptedArray[1], 'hex');
			let decipher = crypto.createDecipheriv('aes-128-cbc', setting.encrypt.key, iv);
			let decrypted = decipher.update(encrypted);
			let plainText = Buffer.concat([decrypted, decipher.final()]).toString();

			return plainText;
		}
	},

	/* 사용자 토큰 */
	token: {
		generateToken: function(userData){
			userData._tokenCreateAt = new Date().getTime()
			
			let payload = Buffer.from(JSON.stringify(userData)).toString('base64')
			let hash = module.exports.encrypt.oneWayLite(payload)
			return `${payload}.${hash}`;
		}
	},

	fileUpload: {
		moveTo: async function(token, bucket, key){
			try{
				let fileName = module.exports.encrypt.decode(token)

				await module.exports.s3.copy({
					Bucket: bucket,
					CopySource: encodeURI(`/${setting.fileUpload.tempBucket}/${fileName}`),
					Key: key,
				})
	
				await module.exports.s3.delete({   
					Bucket: setting.fileUpload.tempBucket,      
					Key: fileName,
				})
			}catch(e){
				throw new Error("유효하지 않은 File Token")
			}
		},

		toStream: async function(token){
			try{
				let fileName = module.exports.encrypt.decode(token)

				let data = await module.exports.s3.auth.getObject({   
					Bucket: setting.fileUpload.tempBucket,      
					Key: fileName,
				});

				await module.exports.s3.delete({   
					Bucket: setting.fileUpload.tempBucket,      
					Key: fileName,
				})

				return data.Body
			}catch(e){
				throw new Error("유효하지 않은 File Token")
			}
		},
	},
}


/* Date 스트링 포멧형식으로 사용할 수 있게 추가 */
Date.prototype.stringFormat = function(format){
	/* 날짜 정보 초기화 */
	let y = this.getFullYear();
	let m = this.getMonth()+1;
	let d = this.getDate();
	let h = this.getHours();
	let i = this.getMinutes();
	let s = this.getSeconds();

	/* 날짜정보 이쁘게 만들기 */
	m = m<10?'0'+m:m;
	d = d<10?'0'+d:d;
	h = h<10?'0'+h:h;
	i = i<10?'0'+i:i;
	s = s<10?'0'+s:s;

	/* 포멧 변환 후 반환 */
	return format.replace(/y/g, y).replace(/m/g, m).replace(/d/g, d).replace(/h/g, h).replace(/i/g, i).replace(/s/g, s);
}

/* Number(초) 시간 단위로 변환하여 사용할 수 있게 추가 */
Number.prototype.secToTime = function(type){
	if(this < 60) return `1분 미만`;
	if(this < 60*60 || type=='min') return `${parseInt(this/60)}분`;
	if(this < 60*60*24 || type=='hour') return `약 ${parseInt(this/(60*60))}시간`;
	if(this < 60*60*24*30.5 || type=='day') return `약 ${parseInt(this/(60*60*24))}일`;
	if(this < 60*60*24*365 || type=='month') return `약 ${parseInt(this/(60*60*24*30))}달`;
	else return `약 ${parseInt(this/(60*60*24*365))}년`;
}

/* 숫자를 읽는 숫자로 변경 */
Number.prototype.toReadFormat = function(){
    if(this<1000) return this;
    var s = ['', 'K', 'M', 'B', 'T'];
    var e = Math.floor(Math.log(this) / Math.log(1000));
    return (this / Math.pow(1000, e)).toFixed(2) + s[e];
}

/* 숫자(바이트)를 읽는 용량으로 변경 */
Number.prototype.byteSizeToString = function(){
	var i = this == 0 ? 0 : Math.floor(Math.log(this) / Math.log(1000));
	return (this / Math.pow(1000, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

/* 숫자(초)를 시간 string으로 변경 */
Number.prototype.secToTimeFormat = function(){
	let h = parseInt(this/3600)
	let m = parseInt(this%3600 / 60)
	let s = parseInt(this%60)

	if(m<10) m = `0${m}`;
	if(s<10) s = `0${s}`;

	return `${h}:${m}:${s}`
}