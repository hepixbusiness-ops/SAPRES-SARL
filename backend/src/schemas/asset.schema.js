const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },

    publicId: String,

    type: {
      type: String,
      enum: ['image', 'video', 'document'],
      required: true
    },

    size: Number,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Asset', assetSchema);
