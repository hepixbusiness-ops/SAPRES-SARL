const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: String,

    resume: String,

    coverLetter: String,

    status: {
      type: String,
      enum: ['submitted', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'submitted'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Application', applicationSchema);
