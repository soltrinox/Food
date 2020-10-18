require("dotenv").config();
const express = require("express");
const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);
// data jobs
require("./datajobs/cron")();

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
