const { celebrate } = require('celebrate');
const avatarUpdateJoiSchema = require('../JoiSchemas/avatarUpdateJoiSchema');
const cardIdJoiSchema = require('../JoiSchemas/cardIdJoiSchema');
const createCardJoiSchema = require('../JoiSchemas/createCardJoiSchema');
const signInJoiSchema = require('../JoiSchemas/signInJoiSchema');
const signUpJoiSchema = require('../JoiSchemas/signUpJoiSchema');
const userIdJoiSchema = require('../JoiSchemas/userIdJoiSchema');
const userUpdateJoiSchema = require('../JoiSchemas/userUpdateJoiSchema');

const validateSignUp = celebrate({
  body: signUpJoiSchema,
});

const validateSignIn = celebrate({
  body: signInJoiSchema,
});

const validateUserUpdate = celebrate({
  body: userUpdateJoiSchema,
});

const validateAvatarUpdate = celebrate({
  body: avatarUpdateJoiSchema,
});

const validateCreateCard = celebrate({
  body: createCardJoiSchema,
});

const validateCardId = celebrate({
  params: cardIdJoiSchema,
});

const validateUserId = celebrate({
  params: userIdJoiSchema,
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserUpdate,
  validateAvatarUpdate,
  validateCreateCard,
  validateCardId,
  validateUserId,
};
