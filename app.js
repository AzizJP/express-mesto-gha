const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { notFoundController } = require("./errors/notFoundController");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "632d5db3f90b1c01ae73d664",
  };

  next();
});

app.use("/", usersRouter);
app.use("/", cardsRouter);
app.use("*", notFoundController);

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
