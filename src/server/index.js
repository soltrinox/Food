require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);
// data jobs
require("./datajobs/cron")();

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
