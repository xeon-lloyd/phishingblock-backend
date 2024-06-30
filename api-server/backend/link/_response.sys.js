const rootResponse = require('../_response.default.sys.js')
const { token } = require('../core/setting.js')

module.exports = {
    ...rootResponse,

    /* CheckURLDanger */
    'URLRequired': class URLRequired extends rootResponse.BadRequest {
        errorCode = 'URL'
        message = 'URL 입력은 필수 입니다'
    },

    'URLNotValid': class URLRequired extends rootResponse.BadRequest {
        errorCode = 'URL'
        message = 'URL이 유효하지 않습니다'
    },

    'CheckURLOK': class CheckURLOK extends rootResponse.OK {
        constructor(result){
            super()
            if(result!=undefined) this.data = result
        }

        message = 'URL 검사 완료'
        data = {
            finalUrl: '리다이렉트 적용 후 최종 도착 url (String)',
            isDanger: 'URL 위험 판단 여부 (boolean)'
        }
    }


    /* // webhooks (이름에 Process를 포함하여 webhook의 응답이란것을 명시) // */

}