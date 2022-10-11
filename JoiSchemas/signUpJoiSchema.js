const { Joi } = require('celebrate');

const signUpJoiSchema = Joi.object().keys({
  name: Joi.string()
    .max(30)
    .min(2),
  about: Joi.string()
    .max(30)
    .min(2),
  avatar: Joi.string()
    .pattern(/^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required(),
});

module.exports = signUpJoiSchema;
