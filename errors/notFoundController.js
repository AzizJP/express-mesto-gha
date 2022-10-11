const { NOT_FOUND_MESSAGE_ROUTE } = require('./errorMessages');
const NotFoundError = require('./NotFoundError');

module.exports.NotFoundController = (req, res, next) => next(
  new NotFoundError(NOT_FOUND_MESSAGE_ROUTE),
);
