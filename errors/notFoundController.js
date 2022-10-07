const { NOT_FOUND, NOT_FOUND_MESSAGE_ROUTE } = require('./errorMessages');

module.exports.notFoundController = (req, res) => res.status(NOT_FOUND)
  .send({ message: NOT_FOUND_MESSAGE_ROUTE });
