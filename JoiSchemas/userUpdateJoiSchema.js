const { Joi } = require('celebrate');

const userUpdateJoiSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .max(30)
    .min(2),
  about: Joi.string()
    .required()
    .max(30)
    .min(2),
});

module.exports = userUpdateJoiSchema;
