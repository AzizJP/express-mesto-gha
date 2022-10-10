const { celebrate } = require('celebrate');
const avatarUpdateJoiSchema = require('../JoiSchemas/avatarUpdateJoiSchema');

const validateAvatarUpdate = celebrate({
  body: avatarUpdateJoiSchema,
});

module.exports = validateAvatarUpdate;
