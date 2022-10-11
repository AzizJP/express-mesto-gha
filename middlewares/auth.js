const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_MESSAGE_AUTH } = require('../errors/errorMessages');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE_AUTH));
  }
  req.user = payload;
  return next();
};
