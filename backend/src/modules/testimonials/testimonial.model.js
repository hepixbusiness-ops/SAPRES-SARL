const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true
    },

    clientCompany: String,

    clientImage: String,

    content: {
      type: String,
      required: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
