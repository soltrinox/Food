const express = require("express");
const router = express.Router();
const { Employee } = require("../models/employee.models");

router.get("/", async (req, res) => {
  const employeeId = req.query.employeeId;
  const records = req.query.records;
  const name = req.query.name;
  let user;
  if (employeeId) {
    user = await Employee.find({ empId: employeeId });
  } else if (records) {
    user = await Employee.find({}).limit(parseInt(records, 10));
  } else if (name && name.length > 3) {
    user = await Employee.find({ FirstName: { $regex: /name/i } });
  } else {
    user = await Employee.find({});
  }
  if (!user) {
    res.status(400).send({
      message: `Could not find any record with employee Id ${req.query.employeeId}`,
    });
  }
  res.send(user);
});

module.exports = router;
