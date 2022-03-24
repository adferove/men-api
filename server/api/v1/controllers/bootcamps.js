const bootcamp = require('../models/Bootcamp.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler((req, res, next) => {
  bootcamp
    .find()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
});

// @desc   Get bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = asyncHandler((req, res, next) => {
  bootcamp
    .findById(req.params.id)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
});

// @desc   Create new bootcamp
// @route  /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler((req, res, next) => {
  bootcamp
    .create(req.body)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
});

// @desc   Update bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcampById = asyncHandler((req, res, next) => {
  bootcamp
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
});

// @desc   Delete bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcampById = asyncHandler((req, res, next) => {
  bootcamp
    .findByIdAndRemove(req.params.id, req.body)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      next(err);
    });
});
