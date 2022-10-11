const { Joi } = require('celebrate');
const { regexForUrl } = require('../utils/constants');

const avatarUpdateJoiSchema = Joi.object().keys({
  avatar: Joi.string()
    .required()
    .pattern(regexForUrl),
});

module.exports = avatarUpdateJoiSchema;
