const response = require('./_response.sys.js');
const setting = require('../core/setting.js');
const util = require('../core/util.js');

module.exports = async function(param, req, res){
    /* auth-key (허용된 사용자만) 확인 */
    if(param.loginUser!='phisingWillFirstPrice') return new response.APIPermissionNotValid()

    /* 각종 입력 유효성 확인 */
    if(typeof param.content!='string' || !param.content) return new response.ParamNotValid('content')
    if(typeof param.isContainURL!='boolean') return new response.ParamNotValid('isContainURL')
    if(typeof param.isContainNumber!='boolean') return new response.ParamNotValid('isContainNumber')
    if(typeof param.sender!='string' || !param.sender) return new response.ParamNotValid('sender')
    if(typeof param.category!='string' || !param.category) return new response.ParamNotValid('category')
    
    /* 카테고리 가져오기 */
    let [ category ] = await util.mysql.select(
        'phising',
        'pk',
        'category',
        'name=?',
        [ param.category ]
    )
    /* 만약에 해당 카테고리가 없다면 추가 */
    if(category==undefined){
        let insertCategory = await util.mysql.insert(
            'phising',
            'category',
            {
                name: param.category
            }
        )
        
        category = { pk: insertCategory.insertId }
    }

    /* 메세지 저장하기 */
    let insertRes = await util.mysql.insert(
        'phising',
        'messages',
        {
            content: param.content,
            isContainUrl: param.isContainURL,
            isContainNumber: param.isContainNumber,
            sender: param.sender,
            category: category.pk,
        }
    )

    /* 메세지 임베딩 저장 */
    await fetch(setting.url.embeddingWorker, {
        method: 'POST',
        headers: {
            auth: setting.encrypt.key
        },
        body: JSON.stringify({
            id: insertRes.insertId,
            content: param.content,
            type: "insert",
            from: "message",
        })
    })
    
    return new response.SaveMessageOK()
}