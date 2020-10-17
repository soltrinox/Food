require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require("graphql");

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

// graphql schema

// const schema = buildSchema(`
//  type Query {
//    hello: String
//  }
// `);

//const root = { hello: () => "hello world" };

app.set("view engine", "pug");
app.set("views", "./views"); // to set default template

app.use(express.static(path.join(__dirname, "dist")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
