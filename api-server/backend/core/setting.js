const setting = {
	AppName: 'Phising Block',
	hostName: 'https://yourhostname.com',
	
	port: 80,

	isProduction: false,

	mysql: {
        'phising': {
		    host: 'your.db.host',
			port: 3306,
		    user: 'yourUserName',
		    password: 'YourPassWord',
			database: 'phisingblock'
	    }
	},
	sqlCamelToSnakeMapping: true,

	fileUpload: {
		limitSize: 5 * 1000 * 1000, // 5mb
		tempBucket: 'upload-temp',		
	},

	encrypt: {
		key: 'YourEncryptKey',
	},

	token: {
		enableTimeExpire: false,
		expire: 3 * 24 * 60 * 60 //s
	},

	url: {
		embeddingWorker: 'https://your-worker.user.workers.dev'
	}
}

module.exports = setting;