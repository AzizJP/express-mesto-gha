const { celebrate } = require('celebrate');
const signInJoiSchema = require('../JoiSchemas/signInJoiSchema');

const validateSignIn = celebrate({
  body: signInJoiSchema,
});

module.exports = validateSignIn;
