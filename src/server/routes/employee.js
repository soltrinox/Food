const express = require("express");
const router = express.Router();

const { Employee } = require("../models/employee.models");
const { GET_ASYNC, SET_ASYNC } = require("../startup/redisConnection");

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
  const getEmployeeDataRedis = await GET_ASYNC("employeeData");
  if (getEmployeeDataRedis) {
    console.log("using redis catch");
    res.send(JSON.parse(getEmployeeDataRedis));
    return;
  }
  const { employeeId, records, search } = req.query;
  let user;
  if (employeeId) {
    user = await Employee.find({ empId: employeeId });
  } else if (records) {
    user = await Employee.find({}).limit(parseInt(records, 10));
  } else if (search && search.length >= 3) {
    let regex = new RegExp(search, "i");
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
    if (!search) {
      user = await Employee.find({});
      // setting redis catch in memory
      // employeeData is a key to store cache data
      // EX for expiration and 15 is the time
      const saveResult = await SET_ASYNC(
        "employeeData",
        JSON.stringify(user),
        "EX",
        15
      );
      console.log(saveResult, "saveResult in redis");
    }
  }

  if (!user) {
    res.status(400).send({
      message: `Could not find any record with key :${search || employeeId}`,
    });
  }

  let recordCount = user && user.length;
  console.log(`fetched : ${recordCount}`);
  res.send(user);
});

module.exports = router;
