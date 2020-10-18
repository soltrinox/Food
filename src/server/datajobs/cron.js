const cron = require("node-cron");
const mongoose = require("mongoose");
const { Employee } = require("../models/employee.models");

const employeeSchema = new mongoose.Schema({});

const EmployeeCron = mongoose.model("employee_cron", employeeSchema);

module.exports = () => {
  cron.schedule("2 * * * * *", async () => {
    //let a = await Employee.find({ Gender: "M" }).limit(1);
    //await EmployeeCron.insertMany(a);
    //console.log("running a task every minute", a, typeof a);
  });
};
