const express = require("express");
const router = express.Router();
const { Employee } = require("../models/employee.models");

router.get("/", async (req, res) => {
  const user = await Employee.find({});
  res.send(user);
});

module.exports = router;
