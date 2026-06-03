const Joi = require('joi');

const updateSettingsSchema = Joi.object({
  companyName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  whatsapp: Joi.string().optional(),
  address: Joi.string().optional(),
  facebook: Joi.string().optional(),
  instagram: Joi.string().optional(),
  linkedin: Joi.string().optional(),
  youtube: Joi.string().optional(),
  seoDefaultTitle: Joi.string().optional(),
  seoDefaultDescription: Joi.string().optional(),
});

module.exports = {
  updateSettingsSchema,
};
