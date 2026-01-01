const Roadmap = require("../models/Roadmap");

// ✅ Create or Update Roadmap
exports.saveRoadmap = async (req, res) => {
  try {
    const { roadmap } = req.body;

    if (!roadmap || !Array.isArray(roadmap)) {
      return res.status(400).json({ message: "Invalid roadmap data" });
    }

    // Keep single roadmap document
    let existing = await Roadmap.findOne();

    if (existing) {
      existing.roadmap = roadmap;
      await existing.save();
      return res.json({ message: "Roadmap updated successfully" });
    }

    const newRoadmap = new Roadmap({ roadmap });
    await newRoadmap.save();

    res.status(201).json({ message: "Roadmap saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch Roadmap (for frontend)
exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne();
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
