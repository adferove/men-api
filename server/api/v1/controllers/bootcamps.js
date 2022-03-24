const bootcamp = require('../models/Bootcamp.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler((req, res, next) => {
  return bootcamp.find().then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Get bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = asyncHandler((req, res, next) => {
  return bootcamp.findById(req.params.id).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Create new bootcamp
// @route  /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler((req, res, next) => {
  return bootcamp.create(req.body).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Update bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcampById = asyncHandler((req, res, next) => {
  return bootcamp
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    });
});

// @desc   Delete bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcampById = asyncHandler((req, res, next) => {
  return bootcamp.findByIdAndRemove(req.params.id, req.body).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});
