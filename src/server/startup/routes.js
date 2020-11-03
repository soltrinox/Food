const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const cookieParser = require("cookie-parser");
const path = require("path");

// routes
const getFoodItems = require("../routes/getFoodItems");
const employee = require("../routes/employee");
const bootcamp = require("../routes/bootcamps");
const courses = require("../routes/courses");
const register = require("../routes/auth");

//const logger = require("../middleware/logger");

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, "public"))); // to server static content
  app.use(express.json({ limit: "50mb" })); // req.body
  app.use(express.urlencoded({ limit: "50mb", extended: true })); // to loges the reqest into terminal
  app.use(cors());
  app.use(cookieParser()); // to capture req cookies
  app.use(responseTime()); // to catpure api response
  // Mount routers
  // customer middleware
  // app.use(logger);
  app.use("/api/getFoodItems", getFoodItems);
  app.use("/api/v1/employee", employee);
  app.use("/api/v1/bootcamps", bootcamp);
  app.use("/api/v1/courses", courses);
  app.use("/api/v1/auth", register);
};
