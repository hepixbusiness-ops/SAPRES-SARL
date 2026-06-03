const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  shortDescription: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  sku: Joi.string().optional(),
  price: Joi.number().required(),
  discountPrice: Joi.number().optional(),
  stock: Joi.number().default(0),
  warranty: Joi.string().optional(),
  featured: Joi.boolean().default(false),
  status: Joi.string().valid('draft', 'published').default('published'),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  discountPrice: Joi.number().optional(),
  stock: Joi.number().optional(),
  warranty: Joi.string().optional(),
  featured: Joi.boolean().optional(),
  status: Joi.string().valid('draft', 'published').optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
};
