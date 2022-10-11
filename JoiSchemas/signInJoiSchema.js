const { Joi } = require('celebrate');

const signInJoiSchema = Joi.object().keys({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .required(),
});

module.exports = signInJoiSchema;
