const path = require('path');
const bootcamp = require('../models/Bootcamp.js');
const geocoder = require('../../../utils/geocoder.js');
const asyncHandler = require('../middleware/asyncHandler.js');

// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = asyncHandler((req, res, next) => {
  bootcamp.countDocuments({}).then((docs) => {
    let query;
    let reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach((param) => delete reqQuery[param]);
    let queryString = JSON.stringify(reqQuery);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = bootcamp.find(JSON.parse(queryString)).populate('courses');

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query.select(fields);
    }

    if (req.query.sort) {
      const fields = req.query.sort.split(',').join(',');
      query.sort(fields);
    }

    //Pagination
    const pagination = {};
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const numberOfPages = Math.ceil(docs / limit);

    if (startIndex > 0 && page <= numberOfPages) {
      pagination.prevPage = page - 1;
    }
    if (page > 0 && page < numberOfPages) {
      pagination.nextPage = page + 1;
    }
    query.skip(startIndex).limit(limit);

    if (page > 0) {
      return query.then((data) => {
        res
          .status(200)
          .json({ success: true, count: data.length, data, pagination, docs });
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Page should be greater than zero' });
    }
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
  return bootcamp.findById(req.params.id).then((data) => {
    data.remove().then((removedBootcamp) => {
      res.status(200).json({ success: true, data: data });
    });
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

// @desc   Bootcamp photo upload
// @route  /api/v1/bootcamps/:id/photo
// @access Private
exports.bootcampPhotoUpload = asyncHandler((req, res, next) => {
  return bootcamp.findById(req.params.id).then((data) => {
    if (req.files) {
      const file = req.files.file;
      if (file.mimetype.substring(0, 5) === 'image') {
        if (file.size > process.env.MAX_FILE_UPLOAD) {
          res.status(400).json({
            success: false,
            message: `image file exceeds max size ${process.env.MAX_FILE_UPLOAD}`,
          });
        }
        file.name = `bootcamp_${data._id}${path.parse(file.name).ext}`;
        const newPath = path.join(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          process.env.FILE_UPLOAD_PATH,
          file.name
        );
        file.mv(newPath, (err) => {
          if (err) {
            res.status(400).json({
              success: false,
              message: 'Something went wrong saving the image',
            });
          } else {
            res.status(200).json({ success: true, message: newPath });
          }
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Please upload an image file' });
    }
  });
});
