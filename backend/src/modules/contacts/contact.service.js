const Contact = require('./contact.model');
const ApiError = require('../../utils/ApiError');

class ContactService {
  static async create(payload) {
    const contact = await Contact.create(payload);
    return contact;
  }

  static async getAll({ page = 1, limit = 20, read = null } = {}) {
    const skip = (page - 1) * limit;
    const query = read !== null ? { read } : {};
    const contacts = await Contact.find(query)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await Contact.countDocuments(query);
    return {
      data: contacts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  static async getById(id) {
    const contact = await Contact.findById(id);
    if (!contact) throw new ApiError('Contact not found', 404);
    return contact;
  }

  static async markAsRead(id) {
    const contact = await Contact.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!contact) throw new ApiError('Contact not found', 404);
    return contact;
  }

  static async delete(id) {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) throw new ApiError('Contact not found', 404);
    return contact;
  }
}

module.exports = ContactService;
