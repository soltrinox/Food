const express = require("express");
const router = express.Router();
const { Employee } = require("../models/employee.models");

const projectedVal = {
  empId: 1,
  FirstName: 1,
  LastName: 1,
  Gender: 1,
  EMail: 1,
  FatherName: 1,
  MotherName: 1,
  DOB: 1,
  Weight: 1,
  Joined: 1,
  ShortMonth: 1,
  Salary: 1,
  SSN: 1,
  PhoneNumber: 1,
  PlaceName: 1,
  County: 1,
  City: 1,
  State: 1,
  Zip: 1,
  Region: 1,
  UserName: 1,
};

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
    user = await Employee.find(
      {
        $or: [
          { FirstName: { $regex: regex } },
          { LastName: { $regex: regex } },
          { PhoneNumber: { $regex: regex } },
        ],
      },
      { ...projectedVal }
    ).sort({ DOB: 1 });
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
