const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },

    value: mongoose.Schema.Types.Mixed,

    type: {
      type: String,
      enum: ['string', 'number', 'boolean', 'json'],
      default: 'string'
    },

    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Setting', settingSchema);
