const ApiError = require('../utils/ApiError');

module.exports = function rolesMiddleware(requiredRoles = []) {
  return function (req, res, next) {
    if (!req.user) return next(new ApiError('Authentication required', 401));
    const hasRole = req.user.roles && requiredRoles.some(r => req.user.roles.includes(r));
    if (!hasRole) return next(new ApiError('Forbidden', 403));
    next();
  };
};
