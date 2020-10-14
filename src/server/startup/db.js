// const winston = require("winston");
// const mongoose = require("mongoose");
// const config = require("config");

// const connection =
//   "mongodb+srv://user:1234@cluster0.sln7s.mongodb.net/playground?retryWrites=true&w=majority";

// module.exports = function () {
//   const dbConnection = config.get("mongoConnection");
//   mongoose
//     .connect(connection, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => winston.info("conneted to mogodb.."))
//     .catch((err) => winston.info("Connected to Mongo"));
//   mongoose.set("useCreateIndex", true);
// };

module.exports = function () {};
