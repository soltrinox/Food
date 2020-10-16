const express = require("express");
const router = express.Router();
const { Employee } = require("../models/employee.models");

router.get("/", async (req, res) => {
  const employeeId = req.query.employeeId;
  const records = req.query.records;
  const serachKey = req.query.search;
  let user;
  if (employeeId) {
    user = await Employee.find({ empId: employeeId });
  } else if (records) {
    user = await Employee.find({}).limit(parseInt(records, 10));
  } else if (serachKey && serachKey.length >= 3) {
    let regex = new RegExp(serachKey, "i");
    user = await Employee.find({
      $or: [
        { FirstName: { $regex: regex } },
        { LastName: { $regex: regex } },
        { PhoneNumber: { $regex: regex } },
      ],
    });
  } else {
    if (!serachKey) user = await Employee.find({});
  }

  if (!user) {
    res.status(400).send({
      message: `Could not find any record with key :${
        serachKey ? serachKey : employeeId
      }`,
    });
  }
  let recordCount = user && user.length;
  console.log(`fetched : ${recordCount}`);
  res.send(user);
});

module.exports = router;
