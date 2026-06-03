const ApiError = require('../utils/ApiError');

module.exports = function validateMiddleware(schema, property = 'body') {
  return async (req, res, next) => {
    try {
      if (!schema || typeof schema.validateAsync !== 'function') return next();
      await schema.validateAsync(req[property], { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      return next(new ApiError('Validation failed', 400, err.details || err.message));
    }
  };
};
