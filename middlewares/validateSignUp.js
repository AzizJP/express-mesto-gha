const { celebrate } = require('celebrate');
const signUpJoiSchema = require('../JoiSchemas/signUpJoiSchema');

const validateSignUp = celebrate({
  body: signUpJoiSchema,
});

module.exports = validateSignUp;
