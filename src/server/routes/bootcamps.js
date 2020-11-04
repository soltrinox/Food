const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");
const { protect } = require("../middleware/auth");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();
// Reroute into other resourse router
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp), getBootcamps)
  .post(protect, createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
