const bootcamp = require('../models/Bootcamp.js');

// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  bootcamp.find().then((data) => {
    res.status(200).json({ success: true, data: data });
  });
};

// @desc   Get bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = (req, res, next) => {
  bootcamp
    .findById(req.params.id)
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
};

// @desc   Create new bootcamp
// @route  /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  bootcamp.create(req.body).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
};

// @desc   Update bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Put bootcamp ${req.params.id}` });
};

// @desc   Delete bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
