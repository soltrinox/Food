const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/Bootcamp");
// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access  Public

// exports.getBootcamps = async (req, res, next) => {
//   try {
//     const bootcamp = await BootCamp.find();
//     res.status(200).json({
//       success: true,
//       count: bootcamp && bootcamp.length,
//       data: bootcamp,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.find();
  res.status(200).json({
    success: true,
    count: bootcamp && bootcamp.length,
    data: bootcamp,
  });
});

// @desc   Get bootcamp
// @route  GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcaomp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({
    success: true,

    data: bootcamp,
  });
});

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.create(req.body);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcaomp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc   update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcaomp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcaomp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: {} });
});
