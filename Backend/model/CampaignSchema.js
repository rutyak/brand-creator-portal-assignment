const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  files: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (value) {
        return (
          typeof value === "string" ||
          (Array.isArray(value) && value.every((v) => typeof v === "string"))
        );
      },
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  applicants: [applicantSchema],
  contents: [contentSchema],
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
