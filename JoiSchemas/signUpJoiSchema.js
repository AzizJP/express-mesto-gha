const { Joi } = require('celebrate');

const signUpJoiSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required()
    .min(8),
}).unknown(true);

module.exports = signUpJoiSchema;
