const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const path = require("path");
const dotenv = require("dotenv");
//Load modles
const Bootcamp = require("./models/Bootcamp");

dotenv.config({ path: "../../config/config.env" });
//connect DB
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
console.log(__dirname, "__dirname");
const filePath = path.join(__dirname, "_data", "bootcamps.json");
// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${filePath}`, "utf-8"));

// import into db

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Date imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Date destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
