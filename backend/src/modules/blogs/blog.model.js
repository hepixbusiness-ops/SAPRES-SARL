const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: String,

    slug: {
      type: String,
      unique: true
    },

    excerpt: String,

    content: String,

    featuredImage: String,

    tags: [String],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    published: {
      type: Boolean,
      default: false
    },

    seoTitle: String,

    seoDescription: String,

    publishedAt: Date
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
