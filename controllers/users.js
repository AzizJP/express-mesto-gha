const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');
const {
  NOT_FOUND_MESSAGE_USER,
  BAD_REQUEST_MESSAGE_POST_USER,
  BAD_REQUEST_MESSAGE_UPDATE_USER,
  BAD_REQUEST_MESSAGE_UPDATE_AVATAR,
  BAD_REQUEST_MESSAGE_ID,
  CONFLICT_MESSAGE_USER,
  UNAUTHORIZED_MESSAGE,
} = require('../errors/ErrorMessages');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/user');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(() => next());

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => {
    throw new Error(NOT_FOUND_MESSAGE_USER);
  })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.message === NOT_FOUND_MESSAGE_USER) {
      next(new NotFoundError(err.message));
    } else if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next();
    }
  });

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.find({ email })
    .then((usr) => {
      if (usr.length > 0) {
        throw new Error(CONFLICT_MESSAGE_USER);
      } else if (isEmail(email) === true) {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          }))
          .then((user) => res.send(user))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError(BAD_REQUEST_MESSAGE_POST_USER));
            } else {
              next(err);
            }
          });
      } else {
        throw new Error(BAD_REQUEST_MESSAGE_POST_USER);
      }
    })
    .catch((err) => {
      if (err.message === CONFLICT_MESSAGE_USER) {
        next(new ConflictError(CONFLICT_MESSAGE_USER));
      } else if (err.message === BAD_REQUEST_MESSAGE_POST_USER) {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_POST_USER));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error(NOT_FOUND_MESSAGE_USER);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === NOT_FOUND_MESSAGE_USER) {
        next(new NotFoundError(err.message));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_UPDATE_USER));
      } else {
        next(err);
      }
    });
};

const updateAvatarById = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error(NOT_FOUND_MESSAGE_USER);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === NOT_FOUND_MESSAGE_USER) {
        next(new NotFoundError(err.message));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_UPDATE_AVATAR));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === UNAUTHORIZED_MESSAGE) {
        next(new UnauthorizedError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarById,
  login,
};
