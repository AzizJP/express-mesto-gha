const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { NotFoundController } = require('./errors/NotFoundController');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validateSignUp = require('./middlewares/validateSignUp');
const validateSignIn = require('./middlewares/validateSignIn');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', NotFoundController);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
