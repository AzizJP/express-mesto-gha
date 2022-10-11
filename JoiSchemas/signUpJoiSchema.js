const { Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const signUpJoiSchema = Joi.object().keys({
  name: Joi.string()
    .max(30)
    .min(2),
  about: Joi.string()
    .max(30)
    .min(2),
  avatar: Joi.string()
    .pattern(regex),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required(),
});

module.exports = signUpJoiSchema;
