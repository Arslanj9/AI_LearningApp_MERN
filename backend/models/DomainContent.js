const mongoose = require("mongoose");

const DomainContentSchema = new mongoose.Schema({
  domain: { type: String, required: true }, // e.g., "AI", "ML", "CV"
  topics: [
    {
      title: { type: String, required: true }, // e.g., "What is AI?"
      content: { type: String }, // optional description/content
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DomainContent", DomainContentSchema);
