const { celebrate } = require('celebrate');
const userIdJoiSchema = require('../JoiSchemas/userIdJoiSchema');

const validateUserId = celebrate({
  params: userIdJoiSchema,
});

module.exports = validateUserId;
