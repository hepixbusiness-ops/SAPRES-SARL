const Joi = require('joi');

const createServiceSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  featured: Joi.boolean().default(false),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

const updateServiceSchema = Joi.object({
  title: Joi.string().optional(),
  slug: Joi.string().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  featured: Joi.boolean().optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
};
