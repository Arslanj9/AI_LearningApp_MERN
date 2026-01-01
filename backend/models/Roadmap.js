const mongoose = require("mongoose");

const roadmapItemSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      type: String,
      required: true,
    },
  ],
});

const RoadmapSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "AI & ML Roadmap",
    },
    roadmap: [roadmapItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", RoadmapSchema);
