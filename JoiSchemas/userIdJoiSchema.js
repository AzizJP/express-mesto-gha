const { Joi } = require('celebrate');

const userIdJoiSchema = Joi.object().keys({
  userId: Joi.string().alphanum().length(24),
});

module.exports = userIdJoiSchema;
