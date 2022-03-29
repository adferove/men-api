const Course = require('../models/Course.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Find courses
// @route  /api/v1/courses
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler((req, res, next) => {
  let params = {};
  if (req.params.bootcampId) params.bootcamp = req.params.bootcampId;

  return Course.find(params)
    .populate({ path: 'bootcamp', select: 'name description' })
    .then((data) => {
      res.status(200).json({ success: true, count: data.length, data });
    });
});
