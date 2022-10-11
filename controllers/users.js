const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  NOT_FOUND_MESSAGE_USER,
  BAD_REQUEST_MESSAGE_POST_USER,
  BAD_REQUEST_MESSAGE_UPDATE_USER,
  BAD_REQUEST_MESSAGE_UPDATE_AVATAR,
  BAD_REQUEST_MESSAGE_ID,
  CONFLICT_MESSAGE_USER,
} = require('../errors/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(() => next());

const getUserMe = (req, res, next) => User.findById(req.user._id)
  .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_USER)))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next(err);
    }
  });

const getUserById = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_USER)))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next(err);
    }
  });

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_MESSAGE_USER));
      } else if (err.name === 'ValidationError') {
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
    .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_USER)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
    .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_USER)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
    .catch(next);
};

module.exports = {
  getUsers,
  getUserMe,
  getUserById,
  createUser,
  updateUser,
  updateAvatarById,
  login,
};
