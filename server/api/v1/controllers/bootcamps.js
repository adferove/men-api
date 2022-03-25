const bootcamp = require('../models/Bootcamp.js');
const geocoder = require('../../../utils/geocoder.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler((req, res, next) => {
  let query;
  let queryString = JSON.stringify(req.query);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = bootcamp.find(JSON.parse(queryString));

  return query.then((data) => {
    res.status(200).json({ success: true, count: data.length, data: data });
  });
});

// @desc   Get bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = asyncHandler((req, res, next) => {
  return bootcamp.findById(req.params.id).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Create new bootcamp
// @route  /api/v1/bootcamps
// @access Private
exports.createBootcamp = asyncHandler((req, res, next) => {
  return bootcamp.create(req.body).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Update bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcampById = asyncHandler((req, res, next) => {
  return bootcamp
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    });
});

// @desc   Delete bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcampById = asyncHandler((req, res, next) => {
  return bootcamp.findByIdAndDelete(req.params.id, req.body).then((data) => {
    res.status(200).json({ success: true, data: data });
  });
});

// @desc   Find bootcamps in radius
// @route  /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private
exports.getBootcampsInRadius = asyncHandler((req, res, next) => {
  const { zipcode, distance } = req.params;
  return geocoder.geocode(zipcode).then((loc) => {
    const lat = loc[0].latitude;
    const lon = loc[0].longitude;
    const radius = distance / 3963;

    return bootcamp
      .find({
        location: { $geoWithin: { $centerSphere: [[lon, lat], radius] } },
      })
      .then((data) => {
        res.status(200).json({ success: true, data: data });
      });
  });
});
