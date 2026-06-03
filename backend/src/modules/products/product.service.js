const Product = require('./product.model');
const ApiError = require('../../utils/ApiError');

class ProductService {
  static async create(payload) {
    const product = await Product.create(payload);
    return product;
  }

  static async getAll({ page = 1, limit = 20, category = null } = {}) {
    const skip = (page - 1) * limit;
    const query = category ? { category } : {};
    const products = await Product.find(query)
      .populate('category')
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Product.countDocuments(query);
    return {
      data: products,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id) {
    const product = await Product.findById(id).populate('category');
    if (!product) throw new ApiError('Product not found', 404);
    return product;
  }

  static async update(id, payload) {
    const product = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!product) throw new ApiError('Product not found', 404);
    return product;
  }

  static async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError('Product not found', 404);
    return product;
  }
}

module.exports = ProductService;
