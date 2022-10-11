const { Joi } = require('celebrate');
const { regexForUrl } = require('../utils/constants');

const createCardJoiSchema = Joi.object().keys({
  name: Joi.string()
    .required()
    .max(30)
    .min(2),
  link: Joi.string()
    .required()
    .pattern(regexForUrl),
});

module.exports = createCardJoiSchema;
