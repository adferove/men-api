const express = require('express');
const router = express.Router({ mergeParams: true });
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
  .post(createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

module.exports = router;
