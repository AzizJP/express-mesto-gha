const { BAD_REQUEST } = require('./ErrorMessages');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestError;
