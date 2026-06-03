const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    companyName: String,

    email: String,

    phone: String,

    whatsapp: String,

    address: String,

    facebook: String,

    instagram: String,

    linkedin: String,

    youtube: String,

    logo: String,

    favicon: String,

    seoDefaultTitle: String,

    seoDefaultDescription: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
