const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ['card', 'bank_transfer', 'wallet'],
      required: true
    },

    transactionId: String,

    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },

    metadata: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
