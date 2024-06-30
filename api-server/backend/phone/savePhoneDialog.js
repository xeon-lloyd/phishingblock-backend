const response = require('./_response.sys.js');
const setting = require('../core/setting.js');
const util = require('../core/util.js');

module.exports = async function(param, req, res){
    /* auth-key (허용된 사용자만) 확인 */
    if(param.loginUser!='phisingWillFirstPrice') return new response.APIPermissionNotValid()

    /* 각종 입력 유효성 확인 */
    if(typeof param.content!='string' || !param.content) return new response.ParamNotValid('content')
    if(typeof param.isGlobal!='boolean') return new response.ParamNotValid('isGlobal')
    if(typeof param.isRequireMoney!='boolean') return new response.ParamNotValid('isRequireMoney')
    if(typeof param.isKeepAlive!='boolean') return new response.ParamNotValid('isKeepAlive')
    if(typeof param.isRequireDownload!='boolean') return new response.ParamNotValid('isRequireDownload')
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

    /* 통화 내용 저장하기 */
    let insertRes = await util.mysql.insert(
        'phising',
        'phoneDialogs',
        {
            content: param.content,
            isGlobal: param.isGlobal,
            isRequireMoney: param.isRequireDownload,
            isKeepAlive: param.isKeepAlive,
            isRequireDownload: param.isRequireDownload,
            sender: param.sender,
            category: category.pk,
        }
    )

    /* 통화내용 임베딩 저장 */
    await fetch(setting.url.embeddingWorker, {
        method: 'POST',
        headers: {
            auth: setting.encrypt.key
        },
        body: JSON.stringify({
            id: insertRes.insertId,
            content: param.content,
            type: "insert",
            from: "phone",
        })
    })
    
    return new response.SavePhoneDialogOK()
}