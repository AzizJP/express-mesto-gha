const {
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
} = require('../errors/errorMessages');

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    const { statusCode = SERVER_ERROR, message = SERVER_ERROR_MESSAGE } = err;
    res.status(statusCode).send({ message });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};
