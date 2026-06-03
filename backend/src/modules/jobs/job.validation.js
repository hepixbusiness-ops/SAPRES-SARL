const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required(),
  department: Joi.string().optional(),
  location: Joi.string().optional(),
  employmentType: Joi.string().valid('full_time', 'part_time', 'contract', 'internship').optional(),
  description: Joi.string().optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
  responsibilities: Joi.array().items(Joi.string()).optional(),
  deadline: Joi.date().optional(),
  status: Joi.string().valid('draft', 'open', 'closed').default('draft'),
});

const updateJobSchema = Joi.object({
  title: Joi.string().optional(),
  department: Joi.string().optional(),
  location: Joi.string().optional(),
  employmentType: Joi.string().valid('full_time', 'part_time', 'contract', 'internship').optional(),
  description: Joi.string().optional(),
  requirements: Joi.array().items(Joi.string()).optional(),
  responsibilities: Joi.array().items(Joi.string()).optional(),
  deadline: Joi.date().optional(),
  status: Joi.string().valid('draft', 'open', 'closed').optional(),
});

module.exports = {
  createJobSchema,
  updateJobSchema,
};
