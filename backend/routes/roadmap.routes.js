const express = require("express");
const router = express.Router();

const {
  createTopic,
  getAllTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
} = require("../controllers/roadmap.controller");

// Create topic (Admin later)
router.post("/", createTopic);

// Get full roadmap
router.get("/", getAllTopics);

// Get single topic
router.get("/:id", getTopicById);

// Update topic
router.patch("/:id", updateTopic);

// Delete topic
router.delete("/:id", deleteTopic);

module.exports = router;
