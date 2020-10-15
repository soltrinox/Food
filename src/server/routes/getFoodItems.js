const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { cloudinary } = require("../utils/cloudnary");

function validate(req) {
  const schema = Joi.object({
    data: Joi.string().required(),
  });
  return schema.validate(req);
}

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const fileStr = req.body.data;
    await cloudinary.uploader.upload(fileStr, {
      upload_preset: "what-A-Burger",
    });
    res.json({ msg: "uploaded" });
  } catch (err) {
    res.status(500).json({ err: "Server down" });
  }
});

module.exports = router;
