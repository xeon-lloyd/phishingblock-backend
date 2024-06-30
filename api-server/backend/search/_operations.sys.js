const paramSchema = require('./_param.sys.js');
const responseSchema = require('./_response.sys.js');

module.exports = {
    'SearchMessageCase': {
        logic: '/search/searchMessageCase.js',
        authRequire: false,

        //documentation
        description: '유사한 문자 사례 검색',
        group: 'search',
        paramSchema: paramSchema.SearchMessageCase,
        responseSchema: [
            responseSchema.ContentRequired,
            responseSchema.SearchMessageCaseOK,
        ]
    },

    'SearchPhoneDialogCase': {
        logic: '/search/searchPhoneDialogCase.js',
        authRequire: false,

        //documentation
        description: '유사한 통화 내용 사례 검색',
        group: 'search',
        paramSchema: paramSchema.SearchPhoneDialogCase,
        responseSchema: [
            responseSchema.ContentRequired,
            responseSchema.SearchPhoneDialogCaseOK,
        ]
    },

}