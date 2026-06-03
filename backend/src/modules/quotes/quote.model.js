const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: String,

    product: String,

    quantity: Number,

    message: String,

    status: {
      type: String,
      enum: ['pending', 'approved', 'sent', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Quote', quoteSchema);
