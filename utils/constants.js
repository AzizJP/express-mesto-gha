const regexForUrl = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/;
const regexForUrlGlobal = /^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/gm;

module.exports = { regexForUrl, regexForUrlGlobal };
