const Quote = require('./quote.model');
const ApiError = require('../../utils/ApiError');

class QuoteService {
  static async create(payload) {
    const quote = await Quote.create(payload);
    return quote;
  }

  static async getAll({ page = 1, limit = 20, status = null } = {}) {
    const skip = (page - 1) * limit;
    const query = status ? { status } : {};
    const quotes = await Quote.find(query)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Quote.countDocuments(query);
    return {
      data: quotes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id) {
    const quote = await Quote.findById(id);
    if (!quote) throw new ApiError('Quote not found', 404);
    return quote;
  }

  static async update(id, payload) {
    const quote = await Quote.findByIdAndUpdate(id, payload, { new: true });
    if (!quote) throw new ApiError('Quote not found', 404);
    return quote;
  }

  static async delete(id) {
    const quote = await Quote.findByIdAndDelete(id);
    if (!quote) throw new ApiError('Quote not found', 404);
    return quote;
  }
}

module.exports = QuoteService;
