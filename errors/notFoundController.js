const { NOT_FOUND_MESSAGE_ROUTE } = require('./ErrorMessages');
const NotFoundError = require('./NotFoundError');

module.exports.NotFoundController = (req, res, next) => next(
  new NotFoundError(NOT_FOUND_MESSAGE_ROUTE),
);
