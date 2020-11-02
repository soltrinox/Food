const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
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
  let query;
  //copy requst query
  const reqQuery = { ...req.query };
  //fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];
  //loop over remove fields and delte them from req query
  removeFields.forEach((p) => delete reqQuery[p]);
  // Create query string
  let queryStr = JSON.stringify(reqQuery);
  // Create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (a) => `$${a}`);
  // finding bootcamps
  query = BootCamp.find(JSON.parse(queryStr)).populate("courses");

  // selecting fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }
  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);
  //excuting
  const bootcamp = await query;
  //Pagination results
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.status(200).json({
    success: true,
    count: bootcamp && bootcamp.length,
    pagination,
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
      `Bootcamp not found with id of ${req.params.id}`,
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
      `Bootcamp not found with id of ${req.params.id}`,
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
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return new ErrorResponse(
      `Bootcamp not found with id of ${req.params.id}`,
      404
    );
  }
  bootcamp.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc get bootcamp within the radius
// @route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  // get lat/lat from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;
  // Calc radius radians
  // Devide distance by radius of earth
  // Earch radius = 3,963mil / 6378km
  const radius = distance / 3963;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
