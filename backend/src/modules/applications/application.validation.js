const Joi = require('joi');

const createApplicationSchema = Joi.object({
  job: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  coverLetter: Joi.string().optional(),
});

const updateApplicationSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewing', 'interview', 'accepted', 'rejected').optional(),
  notes: Joi.string().optional(),
});

module.exports = {
  createApplicationSchema,
  updateApplicationSchema,
};
