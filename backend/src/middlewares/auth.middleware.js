const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { jwtSecret } = require('../config/env');

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError('Authentication required', 401));
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return next(new ApiError('Invalid or expired token', 401));
  }
};
