const rootResponse = require('../_response.default.sys.js')
const { token } = require('../core/setting.js')

module.exports = {
    ...rootResponse,

    /* SearchMessageCase */
    'ContentRequired': class ContentRequired extends rootResponse.BadRequest {
        errorCode = 'content'
        message = 'content 입력은 필수 입니다'
    },

    'SearchMessageCaseOK': class SearchMessageCaseOK extends rootResponse.OK {
        constructor(list){
            super()
            if(list!=undefined) this.data = list
        }
        
        message = '유사한 문자 사례를 검색했습니다'
        data = `[ "유사 문자 사례 (String)" ]`
    },


    /* SearchPhoneDialogCase */
    'ContentRequired': class ContentRequired extends rootResponse.BadRequest {
        errorCode = 'content'
        message = 'content 입력은 필수 입니다'
    },

    'SearchPhoneDialogCaseOK': class SearchPhoneDialogCaseOK extends rootResponse.OK {
        constructor(list){
            super()
            if(list!=undefined) this.data = list
        }
        
        message = '유사한 전화 통화 사례를 검색했습니다'
        data = `[ "유사 전화 통화 사례 (String)" ]`
    }


    /* // webhooks (이름에 Process를 포함하여 webhook의 응답이란것을 명시) // */

}