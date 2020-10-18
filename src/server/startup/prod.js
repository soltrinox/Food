const helmet = require("helmet");
const compression = require("compression");

module.exports = (app) => {
  app.use(helmet()); //to secure http request
  app.use(compression());
};
