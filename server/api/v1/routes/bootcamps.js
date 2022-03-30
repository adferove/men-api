const express = require('express');
const router = express.Router();
const courseRouter = require('./courses.js');

const {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps.js');

router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = router;
