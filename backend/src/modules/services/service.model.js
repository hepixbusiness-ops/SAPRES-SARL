const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    shortDescription: String,

    description: String,

    image: String,

    gallery: [String],

    featured: {
      type: Boolean,
      default: false
    },

    seoTitle: String,

    seoDescription: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Service', serviceSchema);
