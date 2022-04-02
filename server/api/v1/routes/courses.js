const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectRoute, authorize } = require('../middleware/auth.js');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} = require('../controllers/courses.js');
const advancedResults = require('../middleware/advancedResults.js');
const Course = require('../models/Course.js');

router
  .route('/')
  .get(
    advancedResults(Course, { path: 'bootcamp', select: 'name description' }),
    getCourses
  )
  .post(protectRoute, authorize('publisher', 'admin'), createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(protectRoute, authorize('publisher', 'admin'), updateCourseById)
  .delete(protectRoute, authorize('publisher', 'admin'), deleteCourseById);

module.exports = router;
