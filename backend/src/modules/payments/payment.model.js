const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },

    provider: {
      type: String,
      enum: ["mtn", "orange"]
    },

    amount: Number,

    transactionReference: String,

    providerReference: String,

    status: {
      type: String,
      enum: [
        "pending",
        "successful",
        "failed",
        "refunded"
      ],
      default: "pending"
    },

    rawResponse: mongoose.Schema.Types.Mixed
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
