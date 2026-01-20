const Roadmap = require("../models/Roadmap");

/**
 * Create a roadmap topic
 */
exports.createTopic = async (req, res) => {
  try {
    const topic = await Roadmap.create(req.body);
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Get all topics (for React Flow)
 */
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Roadmap.find().sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single topic
 */
exports.getTopicById = async (req, res) => {
  try {
    const topic = await Roadmap.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update topic
 */
exports.updateTopic = async (req, res) => {
  try {
    const updated = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Delete topic
 */
exports.deleteTopic = async (req, res) => {
  try {
    await Roadmap.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
