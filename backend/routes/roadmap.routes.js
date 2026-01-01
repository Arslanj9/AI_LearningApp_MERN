const express = require("express");
const router = express.Router();
const {
  saveRoadmap,
  getRoadmap,
} = require("../controllers/roadmap.controller");

const { protect, adminOnly } = require("../middlewares/authMiddleware.js");

// Admin-only route
router.post("/", saveRoadmap);

// Public route
router.get("/", getRoadmap);

module.exports = router;
