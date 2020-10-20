const BootCamp = require("../models/Bootcamp");
// @desc   Get all bootcamps
// @route  GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.find();
    res
      .status(200)
      .json({
        success: true,
        count: bootcamp && bootcamp.length,
        data: bootcamp,
      });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc   Get bootcamp
// @route  GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findById(req.params.id);
    res.status(200).json({
      success: true,

      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.create(req.body);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(201).json({ success: true, data: bootcamp });
  } catch (err) {
    console.log(err && err.errors);
    res.status(400).json({ success: false });
  }
};

// @desc   update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc   delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await BootCamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
