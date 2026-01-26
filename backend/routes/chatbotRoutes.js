const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbotController");

// Chat endpoint
router.post("/chat", chatbotController.chat);

// Get roadmap overview (optional)
router.get("/roadmap-overview", chatbotController.getRoadmapOverview);

module.exports = router;