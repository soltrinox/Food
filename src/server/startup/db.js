const winston = require("winston");
const mongoose = require("mongoose");

const { MONGO_CONNECTION } = process.env;

module.exports = () => {
  mongoose
    .connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("conneted to mogodb.."))
    .catch((err) => winston.info("Failed to Connect database"));
  mongoose.set("useCreateIndex", true);
};
