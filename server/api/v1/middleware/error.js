const ErrorResponse = require('../../../utils/errorResponse.js');

module.exports = (err, req, res, next) => {
  let error = err;

  if (err.name === 'CastError') {
    error = new ErrorResponse(err.message, 400);
  } else if (err.code === 11000) {
    error = new ErrorResponse('Duplicated key value error', 400);
  } else if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((item) => item.message);
    error = new ErrorResponse(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message });
};
