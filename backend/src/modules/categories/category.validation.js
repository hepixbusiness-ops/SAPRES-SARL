const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().default(true),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
