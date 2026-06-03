const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema(
  {
    label: String,
    value: String
  },
  {
    _id: false
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    sku: {
      type: String,
      unique: true
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice: Number,

    stock: {
      type: Number,
      default: 0
    },

    images: [String],

    datasheets: [String],

    specifications: [specificationSchema],

    warranty: String,

    featured: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    },

    seoTitle: String,

    seoDescription: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
