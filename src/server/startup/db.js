const winston = require("winston");
const mongoose = require("mongoose");

const { MONGO_CONNECTION } = process.env;

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  winston.info(`MongoDB connectd ${conn.connection.host}`);
};

module.exports = connectDB;
