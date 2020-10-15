const express = require("express");
const router = express.Router();
const { cloudinary } = require("../utils/cloudnary");

router.get("/", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:samples")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

router.post("/", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const upload = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "what-A-Burger",
    });
    console.log(upload, "fileSt");
    res.json({ msg: "uploaded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server down" });
  }
});

module.exports = router;
