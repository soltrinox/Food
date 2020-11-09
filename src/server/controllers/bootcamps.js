const path = require("path");
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
  res.status(200).json(res.advancedResults);
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
  // Add user
  req.body.user = req.user.id;
  //check for published bootcamp
  const publishedBootcamp = await BootCamp.findOne({ user: req.user.id });
  // if the user is not an admin they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with Id ${req.user.id} has already published`,
        400
      )
    );
  }
  const bootcamp = await BootCamp.create(req.body);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: bootcamp });
});

// @desc   update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }
  bootcamp = await BootCamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: bootcamp });
});

// @desc   delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401
      )
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

// @desc   Upload photo for bootcamp
// @route  PUT /api/v1/bootcamps/:id/photo
// @access  Private

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  const file = req.files && req.files.file;
  //Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less then ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  // create custom filename

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`problem with file upload`, 500));
    }
    await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });
});
