const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    department: String,

    location: String,

    employmentType: {
      type: String,
      enum: [
        "full_time",
        "part_time",
        "contract",
        "internship"
      ]
    },

    description: String,

    requirements: [String],

    responsibilities: [String],

    deadline: Date,

    status: {
      type: String,
      enum: ["draft", "open", "closed"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);
