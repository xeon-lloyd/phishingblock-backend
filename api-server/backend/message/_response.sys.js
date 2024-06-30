const rootResponse = require('../_response.default.sys.js')
const { token } = require('../core/setting.js')

module.exports = {
    ...rootResponse,

    /* SaveMessage */
    'APIPermissionNotValid': class APIPermissionNotValid extends rootResponse.Forbidden {
        errorCode = 'auth-key'
        message = 'API 사용키가 유효하지 않습니다'
    },

    'ParamNotValid': class ParamNotValid extends rootResponse.BadRequest {
        constructor(errorCode){
            super()
            if(errorCode!=undefined) this.errorCode = errorCode
        }

        errorCode = '(content|isContainURL|isContainNumber|sender|category)'
        message = '입력값이 유효하지 않습니다'
    },

    'SaveMessageOK': class SaveMessageOK extends rootResponse.OK {
        message = '메세지를 저장했습니다'
    }


    /* // webhooks (이름에 Process를 포함하여 webhook의 응답이란것을 명시) // */

}