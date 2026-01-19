const mongoose = require("mongoose");

const DomainContentSchema = new mongoose.Schema({
  domain: { type: String, required: true }, // e.g., "AI", "ML", "CV"
  topics: [
    {
      title: { type: String, required: true }, // e.g., "What is AI?"
      content: { type: String }, // optional description/content
    }
  ],
  pdf: { type: String }, // <-- new field to store PDF URL/path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DomainContent", DomainContentSchema);
