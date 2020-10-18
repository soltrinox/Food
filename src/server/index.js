require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
//var cron = require("node-cron");

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

// cron.schedule("* * * * * *", () => {
//   console.log("running a task every minute");
// });

process.on("unhandledRejection", (ex) => {
  throw ex;
});

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

// app.use(express.static(path.join(__dirname, "dist")));

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../dist/index.html"));
// });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
