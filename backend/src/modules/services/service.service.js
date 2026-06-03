const Service = require('./service.model');
const ApiError = require('../../utils/ApiError');

class ServiceService {
  static async create(payload) {
    const service = await Service.create(payload);
    return service;
  }

  static async getAll({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const services = await Service.find()
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Service.countDocuments();
    return {
      data: services,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id) {
    const service = await Service.findById(id);
    if (!service) throw new ApiError('Service not found', 404);
    return service;
  }

  static async update(id, payload) {
    const service = await Service.findByIdAndUpdate(id, payload, { new: true });
    if (!service) throw new ApiError('Service not found', 404);
    return service;
  }

  static async delete(id) {
    const service = await Service.findByIdAndDelete(id);
    if (!service) throw new ApiError('Service not found', 404);
    return service;
  }
}

module.exports = ServiceService;
