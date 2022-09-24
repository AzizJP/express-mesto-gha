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
} = require("../errors/errorMessages");
const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE }));
};

const getUserById = (req, res) => {
  return User.findById(req.params.userId)
    .orFail(() => {
      throw new Error(NOT_FOUND_MESSAGE_USER);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === NOT_FOUND_MESSAGE_USER) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE_ID });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_POST_USER });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.params.userId,
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
      } else if (err.name === "ValidationError") {
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
    req.params.userId,
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
      } else if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_UPDATE_AVATAR });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarById,
};
