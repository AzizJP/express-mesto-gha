const {
  NOT_FOUND_MESSAGE_CARD,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE_POST_CARDS,
  BAD_REQUEST,
  NOT_FOUND,
} = require("../errors/errorMessages");
const Card = require("../models/card");

const getCards = (req, res) => {
  return Card.find({})
    .orFail(new Error("К сожалению, еще не одной карточки не добавлено"))
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (Error) {
        res.status(NOT_FOUND).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = {
    _id: req.user._id,
  };
  return Card.create({ name, link, owner })
    .then((card) =>
      res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: owner,
        _id: card._id,
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_POST_CARDS });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const deleteCard = (req, res) => {
  return Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({ message: "Пост удалён" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE_CARD });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const likeCard = (req, res) => {
  const owner = {
    _id: req.user._id,
  };
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) =>
      res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: owner,
        _id: card._id,
      })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE_CARD });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const deleteLikeCard = (req, res) => {
  const owner = {
    _id: req.user._id,
  };
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) =>
      res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: owner,
        _id: card._id,
      })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE_CARD });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, deleteLikeCard };
