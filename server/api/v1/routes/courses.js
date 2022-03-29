const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} = require('../controllers/courses.js');

router.route('/').get(getCourses).post(createCourse);

router
  .route('/:id')
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

module.exports = router;
