const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("conneted to mogodb.."))
    .catch((err) => winston.info("Connected to Mongo"));
  mongoose.set("useCreateIndex", true);
};
