const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  resumeText: String,
  jobDescription: String,
  atsScore: Number,
  matchedKeywords: [String],
  missingKeywords: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Resume", resumeSchema);