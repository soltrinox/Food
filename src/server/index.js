require("dotenv").config();
const express = require("express");
const app = express();

// routes

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

//app.use(express.static("dist"));

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
