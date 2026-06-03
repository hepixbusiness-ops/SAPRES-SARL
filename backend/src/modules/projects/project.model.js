const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      unique: true
    },

    clientName: String,

    location: String,

    capacity: String,

    completionDate: Date,

    shortDescription: String,

    description: String,

    images: [String],

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

module.exports = mongoose.model('Project', projectSchema);
