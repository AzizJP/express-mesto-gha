const { Joi } = require('celebrate');
const { regex } = require('../utils/constants');

const createCardJoiSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .max(30)
    .min(2),
  link: Joi.string()
    .required()
    .pattern(regex),
});

module.exports = createCardJoiSchema;
