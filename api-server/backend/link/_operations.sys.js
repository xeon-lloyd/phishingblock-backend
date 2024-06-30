const paramSchema = require('./_param.sys.js');
const responseSchema = require('./_response.sys.js');

module.exports = {
    'CheckURLDanger': {
        logic: '/link/checkURLDanger.js',
        authRequire: false,

        //documentation
        description: 'URL 위험 여부 판단',
        group: 'link',
        paramSchema: paramSchema.CheckURLDanger,
        responseSchema: [
            responseSchema.URLRequired,
            responseSchema.URLNotValid,
            responseSchema.CheckURLOK,
        ]
    },

}