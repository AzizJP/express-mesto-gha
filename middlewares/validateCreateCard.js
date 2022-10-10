const { celebrate } = require('celebrate');
const createCardJoiSchema = require('../JoiSchemas/createCardJoiSchema');

const validateCreateCard = celebrate({
  body: createCardJoiSchema,
});

module.exports = validateCreateCard;
