const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  _id: {
    type: "Number",
  },
  empId: {
    type: "String",
  },
  FirstName: {
    type: "String",
  },
  LastName: {
    type: "String",
  },
  Gender: {
    type: "String",
  },
  EMail: {
    type: "String",
  },
  FatherName: {
    type: "String",
  },
  MotherName: {
    type: "String",
  },
  DOB: {
    type: "Date",
  },
  Weight: {
    type: "Date",
  },
  Joined: {
    type: "Date",
  },
  ShortMonth: {
    type: "String",
  },
  Salary: {
    type: "Date",
  },
  SSN: {
    type: "String",
  },
  PhoneNumber: {
    type: "String",
  },
  PlaceName: {
    type: "String",
  },
  County: {
    type: "String",
  },
  City: {
    type: "String",
  },
  State: {
    type: "String",
  },
  Zip: {
    type: "Date",
  },
  Region: {
    type: "String",
  },
  UserName: {
    type: "String",
  },
});

const Employee = mongoose.model("employees", employeeSchema);

// function validateEmployee(arg) {
//   const schema = Joi.object({
//     name: Joi.string().min(5).max(50).required(),
//     phone: Joi.string().min(1).max(255).required(),
//     subject: Joi.string().min(5).required(),
//   });
//   return schema.validate(arg);
// }

exports.Employee = Employee;
//exports.validateEmployee = validateEmployee;
