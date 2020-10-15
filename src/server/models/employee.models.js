const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  name: { type: String },
  number: { type: String },
  phone: { type: Number },
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
