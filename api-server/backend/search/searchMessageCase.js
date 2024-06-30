const response = require('./_response.sys.js');
const setting = require('../core/setting.js');
const util = require('../core/util.js');

module.exports = async function(param, req, res){
    /* 각종 입력 유효성 확인 */
    if(typeof param.content!='string' || !param.content) return new response.ContentRequired('content')

    /* 문자내용 유사도 검색 */
    let result = await fetch(setting.url.embeddingWorker, {
        method: 'POST',
        headers: {
            auth: setting.encrypt.key
        },
        body: JSON.stringify({
            content: param.content,
            type: "query",
            from: "message",
        })
    })
    result = await result.json()

    let tasks = []
    result = result.matches
        .filter(ele=> ele.score>0.92?true:false )
        .forEach(ele=>{
            tasks.push(util.mysql.select(
                'phising',
                'content',
                'messages',
                'pk=?',
                [ ele.id.substring(1) ]
            ))
        })
    
    result = await Promise.allSettled(tasks)
    
    result = result.map(ele=> ele.value[0].content )
    
    return new response.SearchMessageCaseOK(result)
}