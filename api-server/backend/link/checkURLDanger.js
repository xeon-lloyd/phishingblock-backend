const response = require('./_response.sys.js');
const setting = require('../core/setting.js');
const util = require('../core/util.js');


async function checkUrl(url){
    try{
        let result = await fetch(url, {
            cache: 'no-cache',
            redirect: 'follow',
        })

        let resHeader = result.headers.get('content-type').split(';')?.[0]        
        return isValidHeader(resHeader)
    }catch(e){
        return null
    }
}

function isValidHeader(header){
    //text 형식이면 OK
    if(header.startsWith('text/')) return true;

    //font 형식이면 OK
    if(header.startsWith('font/')) return true;

    //image 형식이면 OK
    if(header.startsWith('image/')) return true;

    //video 형식이면 OK
    if(header.startsWith('video/')) return true;

    //javascript, json 이면 OK
    if(header=='application/javascript') return true;
    if(header=='application/json') return true;

    //xml 이면 OK
    if(header.endsWith('xml')) return true;

    console.log(header)
    return false;
}


module.exports = async function(param, req, res){
    if(!param.url) return new response.URLRequired()

    let result;
    let innerResult;
    try{
        //URL 요청
        result = await fetch(param.url, {
            cache: 'no-cache',
            redirect: 'follow',
        })

        // html 응답이 아니라면 비정상 (다운로드 헤더 등)
        let resHeader = result.headers.get('content-type').split(';')?.[0]
        if(!isValidHeader(resHeader)) return new response.CheckURLOK({
            finalUrl: result.url,
            isDanger: true
        })

        // 페이지 내부 검사
        let resContent = await result.text()
        let urls = resContent.match(/(?:href|src|content)=["'](https?:\/\/[^\s"']+)["']/g)
        urls = urls.map((url)=> url.replace(/(href|src|content|\")/g, '').substring(1) )
        
        let tasks = [];
        urls.forEach(url => tasks.push(checkUrl(url)) )
        innerResult = await Promise.allSettled(tasks)
        innerResult = innerResult.every(res => res.value!=false)

    }catch(e){
        return new response.URLNotValid()
    }

    return new response.CheckURLOK({
        finalUrl: result.url,
        isDanger: !innerResult
    })
}