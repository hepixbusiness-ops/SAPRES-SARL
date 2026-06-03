const Joi = require('joi');

const createQuoteSchema = Joi.object({
  clientName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  product: Joi.string().optional(),
  quantity: Joi.number().optional(),
  message: Joi.string().optional(),
});

const updateQuoteSchema = Joi.object({
  status: Joi.string().valid('pending', 'approved', 'sent', 'rejected').optional(),
});

module.exports = {
  createQuoteSchema,
  updateQuoteSchema,
};
