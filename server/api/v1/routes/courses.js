const express = require('express');
const router = express.Router({ mergeParams: true });
const { protectRoute } = require('../middleware/protectRoute.js');
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
  .post(protectRoute, createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(protectRoute, updateCourseById)
  .delete(protectRoute, deleteCourseById);

module.exports = router;
