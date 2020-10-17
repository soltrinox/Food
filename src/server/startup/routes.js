const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
//const StatsD = require('node-statsd')

const getFoodItems = require("../routes/getFoodItems");
const employee = require("../routes/employee");

module.exports = (app) => {
  app.use(express.static("public")); // to server static content
  app.use(express.json({ limit: "50mb" })); // req.body
  app.use(express.urlencoded({ limit: "50mb", extended: true })); // to loges the reqest into terminal
  app.use(cors());
  app.use(responseTime());
  app.use("/api/getFoodItems", getFoodItems);
  app.use("/api/employee", employee);
};
