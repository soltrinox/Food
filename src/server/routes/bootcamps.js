const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: { id: 1 } });
});

router.get("/:id", function (req, res) {
  res
    .status(200)
    .json({ success: true, msg: `show bootcamp ${req.params.id}` });
});

router.post("/", function (req, res) {
  res.status(200).json({ success: true, msg: "Create new bootcamp" });
});

router.put("/:id", function (req, res) {
  res
    .status(200)
    .json({ success: true, msg: `update bootcamp ${req.params.id}` });
});

router.delete("/:id", function (req, res) {
  res
    .status(200)
    .json({ success: true, msg: `delete bootcamp ${req.params.id}` });
});

module.exports = router;
