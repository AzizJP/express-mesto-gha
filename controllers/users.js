const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  NOT_FOUND,
  NOT_FOUND_MESSAGE_USER,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE_POST_USER,
  BAD_REQUEST_MESSAGE_UPDATE_USER,
  BAD_REQUEST_MESSAGE_UPDATE_AVATAR,
  BAD_REQUEST_MESSAGE_ID,
} = require('../errors/errorMessages');
const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE }));

const getUserById = (req, res) => User.findById(req.params.userId)
  .orFail(() => {
    throw new Error(NOT_FOUND_MESSAGE_USER);
  })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.message === NOT_FOUND_MESSAGE_USER) {
      res.status(NOT_FOUND).send({ message: err.message });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE_ID });
    } else {
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
    }
  });

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.find({ email })
    .then((usr) => {
      if (usr.length > 0) {
        throw new Error(`Пользователь с email '${email}' уже существует.`);
      }
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
            console.log(err);
            res
              .status(BAD_REQUEST)
              .send({ message: BAD_REQUEST_MESSAGE_POST_USER });
          } else {
            res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
          }
        });
    })
    .catch((err) => {
      if (err.message === `Пользователь с email '${email}' уже существует.`) {
        res
          .status(401)
          .send({ message: `Пользователь с email '${email}' уже существует.` });
      }
    });
};

const updateUser = (req, res) => {
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
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_UPDATE_USER });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const updateAvatarById = (req, res) => {
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
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_UPDATE_AVATAR });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
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
