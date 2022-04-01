const asyncHandler = require('../middleware/asyncHandler.js');
const ErrorResponse = require('../../../utils/errorResponse.js');
const User = require('../models/User.js');

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler((req, res, next) => {
  const { name, email, password, role } = req.body;
  return User.create({
    name,
    email,
    password,
    role,
  }).then((user) => {
    sendTokenResponse(user, 200, res);
  });
});

// @desc   Login
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler((req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please enter your email and password', 400));
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new ErrorResponse('Incorrect email/password', 400));
      }

      if (!user.verifyPassword(password)) {
        return next(new ErrorResponse('Incorrect email/password', 400));
      }
      sendTokenResponse(user, 200, res);
    });
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

// @desc   Get Me
// @route  GET /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler((req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});
