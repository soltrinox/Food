const express = require("express");
const cors = require("cors");
const getFoodItems = require("../routes/getFoodItems");

module.exports = function (app) {
  app.use(express.json()); // req.body
  app.use(cors());
  app.use(express.urlencoded({ extended: true })); // to loges the reqest into terminal
  app.use(express.static("public")); // to server static content

  app.use("/api/getFoodItems", getFoodItems);
};
