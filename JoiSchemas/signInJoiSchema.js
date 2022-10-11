const { Joi } = require('celebrate');

const signUpJoiSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required(),
});

module.exports = signUpJoiSchema;
