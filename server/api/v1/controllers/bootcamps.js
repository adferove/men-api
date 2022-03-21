// @desc   Get all bootcamps
// @route  /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Get All bootcamps' });
};

// @desc   Get bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Public
exports.getBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp ${req.params.id}` });
};

// @desc   Create new bootcamp
// @route  /api/v1/bootcamps
// @access Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, message: 'Post a new bootcamp' });
};

// @desc   Update bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.updateBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Put bootcamp ${req.params.id}` });
};

// @desc   Delete bootcamp by id
// @route  /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcampById = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
