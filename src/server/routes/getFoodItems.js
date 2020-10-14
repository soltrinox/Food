const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ username: "test" });
});

router.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

module.exports = router;
