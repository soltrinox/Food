const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
// @desc   Get all courses
// @route  GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public

exports.getCourses = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  let query;
  if (bootcampId) {
    query = Course.find({ bootcamp: bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({ status: true, count: courses.length, data: courses });
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.find({ id }).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      add single course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  req.body.bootcamp = bootcampId;

  const bootcamp = await Bootcamp.findById(bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${bootcampId}`, 404)
    );
  }
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      add udpate course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id of ${bootcampId}`, 404)
    );
  }
  (course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  })),
    res.status(200).json({
      success: true,
      data: course,
    });
});
