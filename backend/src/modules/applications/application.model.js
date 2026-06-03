const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },

    firstName: String,

    lastName: String,

    email: String,

    phone: String,

    address: String,

    cv: String,

    diploma: String,

    idCard: String,

    passportPhoto: String,

    coverLetter: String,

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "interview",
        "accepted",
        "rejected"
      ],
      default: "pending"
    },

    notes: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Application', applicationSchema);
