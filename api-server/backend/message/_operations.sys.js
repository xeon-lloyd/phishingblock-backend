const paramSchema = require('./_param.sys.js');
const responseSchema = require('./_response.sys.js');

module.exports = {
    'SaveMessage': {
        logic: '/message/saveMessage.js',
        authRequire: true,

        //documentation
        description: '메세지 DB 저장',
        group: 'message',
        paramSchema: paramSchema.SaveMessage,
        responseSchema: [
            responseSchema.APIPermissionNotValid,
            responseSchema.ParamNotValid,
            responseSchema.SaveMessageOK,
        ]
    },

}