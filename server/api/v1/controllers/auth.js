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
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, data: user, token });
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
      const token = user.getSignedJwtToken();
      res.status(200).json({ success: true, token, data: user });
    });
});
