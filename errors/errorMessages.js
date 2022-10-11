const BAD_REQUEST = 400;
const BAD_REQUEST_MESSAGE_POST_CARDS = 'Переданы некорректные данные при создании карточки';
const BAD_REQUEST_MESSAGE_CARDS_LIKES = 'Переданы некорректные данные для постановки/снятии лайка';
const BAD_REQUEST_MESSAGE_POST_USER = 'Переданы некорректные данные при создании пользователя';
const BAD_REQUEST_MESSAGE_UPDATE_USER = 'Переданы некорректные данные при обновлении профиля';
const BAD_REQUEST_MESSAGE_UPDATE_AVATAR = 'Переданы некорректные данные при обновлении аватара';
const BAD_REQUEST_MESSAGE_ID = 'Передан некорректный _id';
const UNAUTHORIZED = 401;
const UNAUTHORIZED_MESSAGE = 'Неправильные почта или пароль';
const UNAUTHORIZED_MESSAGE_AUTH = 'Необходима авторизация';
const NOT_FOUND = 404;
const NOT_FOUND_MESSAGE_ROUTE = 'Запрашиваемый ресурс не найден';
const NOT_FOUND_MESSAGE_USER = 'Пользователь по указанному _id не найден';
const NOT_FOUND_MESSAGE_CARD = 'Карточка с указанным _id не найдена';
const NOT_FOUND_MESSAGE_CARD_LIKES = 'Передан несуществующий _id карточки';
const FORBIDDEN = 403;
const FORBIDDEN_MESSAGE_CARD = 'Карточка принадлежит другому пользователю';
const CONFLICT = 409;
const CONFLICT_MESSAGE_USER = 'Пользователь с таким email уже существует';
const SERVER_ERROR = 500;
const SERVER_ERROR_MESSAGE = 'Неизвестная ошибка сервера';

module.exports = {
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE_POST_CARDS,
  BAD_REQUEST_MESSAGE_CARDS_LIKES,
  BAD_REQUEST_MESSAGE_POST_USER,
  BAD_REQUEST_MESSAGE_UPDATE_USER,
  BAD_REQUEST_MESSAGE_UPDATE_AVATAR,
  BAD_REQUEST_MESSAGE_ID,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE,
  UNAUTHORIZED_MESSAGE_AUTH,
  NOT_FOUND,
  NOT_FOUND_MESSAGE_ROUTE,
  NOT_FOUND_MESSAGE_USER,
  NOT_FOUND_MESSAGE_CARD,
  NOT_FOUND_MESSAGE_CARD_LIKES,
  FORBIDDEN,
  FORBIDDEN_MESSAGE_CARD,
  CONFLICT,
  CONFLICT_MESSAGE_USER,
  SERVER_ERROR,
  SERVER_ERROR_MESSAGE,
};
