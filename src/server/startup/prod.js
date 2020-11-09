const helmet = require("helmet");
const compression = require("compression");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const responseTime = require("response-time");

module.exports = (app) => {
  app.use(mongoSanitize()); // sanitize data
  app.use(helmet()); // Set security headers
  app.use(xss()); //Prevent xss attacks
  //rate limiting for the end point
  const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, // 10min
    max: 100,
  });
  app.use(limiter);
  app.use(hpp()); //Prevent http param pollution
  app.use(cors()); //Enable cors
  app.use(responseTime()); // to catpure api response
  app.use(compression());
};
