const paramSchema = require('./_param.sys.js');
const responseSchema = require('./_response.sys.js');

module.exports = {
    'SavePhoneDialog': {
        logic: '/phone/savePhoneDialog.js',
        authRequire: true,

        //documentation
        description: '통화 내용 저장',
        group: 'phone',
        paramSchema: paramSchema.SavePhoneDialog,
        responseSchema: [
            responseSchema.APIPermissionNotValid,
            responseSchema.ParamNotValid,
            responseSchema.SavePhoneDialogOK,
        ]
    },

}