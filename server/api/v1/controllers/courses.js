const Course = require('../models/Course.js');
const Bootcamp = require('../models/Bootcamp.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Find courses
// @route  /api/v1/courses
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access Public
exports.getCourses = asyncHandler((req, res, next) => {
  let params = {};
  if (req.params.bootcampId) {
    return Course.find(params)
      .populate({ path: 'bootcamp', select: 'name description' })
      .then((data) => {
        res.status(200).json({ success: true, count: data.length, data });
      });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc   Get Course by id
// @route  /api/v1/courses/:id
// @access Public
exports.getCourseById = asyncHandler((req, res, next) => {
  return Course.findById(req.params.id)
    .populate({
      path: 'bootcamp',
      select: 'name description',
    })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    });
});

// @desc   Create new course
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access Private
exports.createCourse = asyncHandler((req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  return Bootcamp.findById(req.params.bootcampId).then((bc) => {
    if (bc) {
      return Course.create(req.body).then((data) => {
        res.status(200).json({ success: true, data: data });
      });
    }
  });
});

// @desc   Update course by id
// @route  /api/v1/courses/:id
// @access Private
exports.updateCourseById = asyncHandler((req, res, next) => {
  return Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Delete course by id
// @route  /api/v1/courses/:id
// @access Private
exports.deleteCourseById = asyncHandler((req, res, next) => {
  return Course.findById(req.params.id).then((data) => {
    data.remove().then((removedCourse) => {
      res.status(200).json({ success: true, data: data });
    });
  });
});
