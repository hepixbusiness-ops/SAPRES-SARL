const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema(
  {
    heroTitle: String,

    heroSubtitle: String,

    heroImage: String,

    aboutSection: String,

    servicesHighlight: [
      {
        title: String,
        description: String,
        icon: String
      }
    ],

    productsHighlight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],

    projectsHighlight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],

    testimonialsHighlight: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Testimonial'
      }
    ],

    cta: {
      title: String,
      text: String,
      link: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Homepage', homepageSchema);
