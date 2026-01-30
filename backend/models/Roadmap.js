const mongoose = require("mongoose");

const roadmapsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    details: { type: String }, // optional

    side: {
      type: String,
      enum: ["left", "right", "center"],
      default: "center",
    },

    order: {
      type: Number,
      required: true,
      unique: true,
    }, 

    subTopics: [
      {
        title: { type: String, required: true },
        details: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmaps", roadmapsSchema);
