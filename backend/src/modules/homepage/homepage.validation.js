const Joi = require('joi');

const updateHomepageSchema = Joi.object({
  heroTitle: Joi.string().optional(),
  heroSubtitle: Joi.string().optional(),
  aboutSection: Joi.string().optional(),
});

module.exports = {
  updateHomepageSchema,
};
