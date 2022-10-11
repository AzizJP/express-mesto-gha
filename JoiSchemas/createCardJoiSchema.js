const { Joi } = require('celebrate');

const createCardJoiSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .max(30)
    .min(2),
  link: Joi.string()
    .required()
    .pattern(/^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/),
});

module.exports = createCardJoiSchema;
