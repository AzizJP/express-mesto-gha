const { Joi } = require('celebrate');

const cardIdJoiSchema = Joi.object().keys({
  cardId: Joi.string().alphanum().length(24),
});

module.exports = cardIdJoiSchema;
