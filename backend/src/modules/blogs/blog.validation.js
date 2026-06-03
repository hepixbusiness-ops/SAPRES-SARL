const Joi = require('joi');

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  excerpt: Joi.string().optional(),
  content: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

const updateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  slug: Joi.string().optional(),
  excerpt: Joi.string().optional(),
  content: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  published: Joi.boolean().optional(),
  publishedAt: Joi.date().optional(),
  seoTitle: Joi.string().optional(),
  seoDescription: Joi.string().optional(),
});

module.exports = {
  createBlogSchema,
  updateBlogSchema,
};
