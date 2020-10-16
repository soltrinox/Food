const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("conneted to mogodb.."))
    .catch((err) => winston.info("Failed to Connect database"));
  mongoose.set("useCreateIndex", true);
};
