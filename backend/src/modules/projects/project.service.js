const Project = require('./project.model');
const ApiError = require('../../utils/ApiError');

class ProjectService {
  static async create(payload) {
    const project = await Project.create(payload);
    return project;
  }

  static async getAll({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Project.countDocuments();
    return {
      data: projects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id) {
    const project = await Project.findById(id);
    if (!project) throw new ApiError('Project not found', 404);
    return project;
  }

  static async update(id, payload) {
    const project = await Project.findByIdAndUpdate(id, payload, { new: true });
    if (!project) throw new ApiError('Project not found', 404);
    return project;
  }

  static async delete(id) {
    const project = await Project.findByIdAndDelete(id);
    if (!project) throw new ApiError('Project not found', 404);
    return project;
  }
}

module.exports = ProjectService;
