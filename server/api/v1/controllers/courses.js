const Course = require('../models/Course.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Find courses
// @route  /api/v1/courses
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler((req, res, next) => {
  if (req.params.bootcampId) {
    return Course.find({ bootcamp: req.params.bootcampId }).then((data) => {
      res.status(200).json({ success: true, count: data.length, data });
    });
  } else {
    return Course.find().then((data) => {
      res.status(200).json({ success: true, count: data.length, data });
    });
  }
});
