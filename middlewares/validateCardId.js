const { celebrate } = require('celebrate');
const cardIdJoiSchema = require('../JoiSchemas/cardIdJoiSchema');

const validateCardId = celebrate({
  params: cardIdJoiSchema,
});

module.exports = validateCardId;
