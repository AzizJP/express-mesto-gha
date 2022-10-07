const {
  NOT_FOUND_MESSAGE_CARD,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
  BAD_REQUEST_MESSAGE_POST_CARDS,
  BAD_REQUEST,
  NOT_FOUND,
  BAD_REQUEST_MESSAGE_ID,
} = require('../errors/errorMessages');
const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.send(cards))
  .catch((err) => {
    if (Error) {
      res.status(NOT_FOUND).send({ message: err.message });
    } else {
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
    }
  });

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = {
    _id: req.user._id,
  };
  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: BAD_REQUEST_MESSAGE_POST_CARDS });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

const deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .orFail(() => {
    throw new Error(NOT_FOUND_MESSAGE_CARD);
  })
  .then(() => res.send({ message: 'Пост удалён' }))
  .catch((err) => {
    if (err.message === NOT_FOUND_MESSAGE_CARD) {
      res.status(NOT_FOUND).send({ message: err.message });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE_ID });
    } else {
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
    }
  });

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new Error(NOT_FOUND_MESSAGE_CARD);
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === NOT_FOUND_MESSAGE_CARD) {
      res.status(NOT_FOUND).send({ message: err.message });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE_ID });
    } else {
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
    }
  });

const deleteLikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new Error(NOT_FOUND_MESSAGE_CARD);
  })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.message === NOT_FOUND_MESSAGE_CARD) {
      res.status(NOT_FOUND).send({ message: err.message });
    } else if (err.name === 'CastError') {
      res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE_ID });
    } else {
      res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
