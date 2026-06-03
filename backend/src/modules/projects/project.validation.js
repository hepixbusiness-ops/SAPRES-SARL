const Joi = require('joi');

const createProjectSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().optional(),
  clientName: Joi.string().optional(),
  location: Joi.string().optional(),
  capacity: Joi.string().optional(),
  completionDate: Joi.date().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  featured: Joi.boolean().default(false),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

const updateProjectSchema = Joi.object({
  title: Joi.string().optional(),
  slug: Joi.string().optional(),
  clientName: Joi.string().optional(),
  location: Joi.string().optional(),
  capacity: Joi.string().optional(),
  completionDate: Joi.date().optional(),
  shortDescription: Joi.string().optional(),
  description: Joi.string().optional(),
  featured: Joi.boolean().optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};
