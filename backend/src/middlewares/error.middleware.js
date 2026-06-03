const ApiError = require('../utils/ApiError');

module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || null,
    });
  }

  console.error('Unhandled Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
};
