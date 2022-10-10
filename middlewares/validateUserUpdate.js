const { celebrate } = require('celebrate');
const userUpdateJoiSchema = require('../JoiSchemas/userUpdateJoiSchema');

const validateUserUpdate = celebrate({
  body: userUpdateJoiSchema,
});

module.exports = validateUserUpdate;
