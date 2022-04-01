const express = require('express');
const router = express.Router();
const courseRouter = require('./courses.js');
const { protectRoute } = require('../middleware/protectRoute.js');

const {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps.js');
const advancedResults = require('../middleware/advancedResults.js');
const Bootcamp = require('../models/Bootcamp.js');

router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protectRoute, createBootcamp);

router.route('/:id/photo').put(bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcampById)
  .put(protectRoute, updateBootcampById)
  .delete(protectRoute, deleteBootcampById);

module.exports = router;
