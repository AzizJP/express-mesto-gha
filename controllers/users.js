const {
  NOT_FOUND,
  NOT_FOUND_MESSAGE_USER,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE_POST_USER,
  BAD_REQUEST_MESSAGE_UPDATE_USER,
  BAD_REQUEST_MESSAGE_UPDATE_AVATAR,
} = require("../errors/errorMessages");
const User = require("../models/user");

const getUsers = (req, res) => {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE }));
};

const getUserById = (req, res) => {
  return User.findById(req.user._id)
    .orFail(new Error(NOT_FOUND_MESSAGE_USER))
    .then((user) => {
      res.status(200).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (Error) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      }))
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
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error(NOT_FOUND_MESSAGE_USER))
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_UPDATE_USER });
      } else if (Error) {
        res.status(NOT_FOUND).send({ message: err.message });
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
    .orFail(new Error(NOT_FOUND_MESSAGE_USER))
    .then((user) =>
      res
        .status(200)
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_UPDATE_AVATAR });
      } else if (Error) {
        res.status(NOT_FOUND).send({ message: err.message });
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
