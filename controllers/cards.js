const {
  NOT_FOUND_MESSAGE_CARD,
  BAD_REQUEST_MESSAGE_POST_CARDS,
  BAD_REQUEST_MESSAGE_ID,
  FORBIDDEN_MESSAGE_CARD,
} = require('../errors/errorMessages');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequest');
const Card = require('../models/card');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch((err) => {
    next(err);
  });

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = {
    _id: req.user._id,
  };
  return Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE_POST_CARDS));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_CARD)))
  .then((card) => {
    if (String(card.owner) !== req.user._id) {
      return next(new ForbiddenError(FORBIDDEN_MESSAGE_CARD));
    }
    return card.remove()
      .then(() => res.send({ message: 'Карточка удалена' }));
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next(err);
    }
  });

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_CARD)))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next(err);
    }
  });

const deleteLikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => next(new NotFoundError(NOT_FOUND_MESSAGE_CARD)))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE_ID));
    } else {
      next(err);
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
