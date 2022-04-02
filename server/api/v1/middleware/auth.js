const jwt = require('jsonwebtoken');
const ErrorResponse = require('../../../utils/errorResponse.js');
const User = require('../models/User.js');

exports.protectRoute = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.substring(0, 6) === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = User.findById(decoded.id).then((user) => {
        req.user = user;
        next();
      });
    } catch (err) {
      next(new Error('Invalid token', 401));
    }
  } else {
    return next(new ErrorResponse('Unauthorized', 401));
  }
};

exports.authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User with role ${req.user.role} is unauthorized to access the route`,
          403
        )
      );
    } else {
      next();
    }
  };
