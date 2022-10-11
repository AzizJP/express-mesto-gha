const { Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const avatarUpdateJoiSchema = Joi.object().keys({
  avatar: Joi.string()
    .required()
    .pattern(regex),
});

module.exports = avatarUpdateJoiSchema;
