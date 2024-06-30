const express = require('express');
const app = express();
const server = require('http').createServer(app);

const serverInfoPrinter = require('./backend/_system_/serverInfoPrinter.sys.js');

const setting = require('./backend/core/setting.js');
const util = require('./backend/core/util.js');

/* 쿠키 사용 설정(F/B) */
app.use(require('cookie-parser')());

/* 백엔드 로직 초기화(api, webhook, socket, api-doc)(B) */
require('./backend/_system_/initialize.sys.js')(app);

/* request aborted 핸들링 */
app.use((err, req, res, next) => {
    if(err && err.code === 'ECONNABORTED'){
        res.status(400).end();
    }else{
        next(err);
    }
});

/* static 리소스 폴더 설정(F) */
app.use(express.static('public'));

/* 서버 시작 */
server.listen(setting.port, async function(){
    /* DB 연결 */
    util.mysql.connect('phising');

    serverInfoPrinter();
})