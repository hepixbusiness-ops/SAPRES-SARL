const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
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

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    content: {
      type: String,
      required: true
    },

    excerpt: String,

    featuredImage: String,

    tags: [String],

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },

    views: {
      type: Number,
      default: 0
    },

    seoTitle: String,

    seoDescription: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
