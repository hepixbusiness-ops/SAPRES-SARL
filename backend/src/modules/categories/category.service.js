const Category = require('./category.model');
const ApiError = require('../../utils/ApiError');

class CategoryService {
  static async create(data) {
    const existing = await Category.findOne({ slug: data.slug });
    if (existing) throw new ApiError('Category slug already exists', 400);
    return await Category.create(data);
  }

  static async getAll({ page = 1, limit = 20 } = {}) {
    const skip = (page - 1) * limit;
    const categories = await Category.find().skip(skip).limit(limit);
    const total = await Category.countDocuments();
    return {
      data: categories,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  static async getById(id) {
    const category = await Category.findById(id);
    if (!category) throw new ApiError('Category not found', 404);
    return category;
  }

  static async update(id, data) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) throw new ApiError('Category not found', 404);
    return category;
  }

  static async delete(id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new ApiError('Category not found', 404);
    return category;
  }
}

module.exports = CategoryService;
