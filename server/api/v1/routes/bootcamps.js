const express = require('express');
const router = express.Router();
const {
  getBootcamps,
  getBootcampById,
  createBootcamp,
  updateBootcampById,
  deleteBootcampById,
  getBootcampsInRadius,
} = require('../controllers/bootcamps.js');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcampById)
  .put(updateBootcampById)
  .delete(deleteBootcampById);

module.exports = router;
