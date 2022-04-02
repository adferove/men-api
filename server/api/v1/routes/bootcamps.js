const express = require('express');
const router = express.Router();
const courseRouter = require('./courses.js');
const { protectRoute, authorize } = require('../middleware/auth.js');

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
  .post(protectRoute, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id/photo')
  .put(protectRoute, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcampById)
  .put(protectRoute, authorize('publisher', 'admin'), updateBootcampById)
  .delete(protectRoute, authorize('publisher', 'admin'), deleteBootcampById);

module.exports = router;
