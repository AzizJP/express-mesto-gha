const { Joi } = require('celebrate');

const avatarUpdateJoiSchema = Joi.object().keys({
  avatar: Joi.string()
    .required()
    .pattern(/^(https?:\/\/)?([\w]{1,32}\.[\w]{1,32})[^]*$/),
});

module.exports = avatarUpdateJoiSchema;
