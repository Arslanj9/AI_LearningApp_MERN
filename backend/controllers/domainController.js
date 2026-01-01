// controllers/domainController.js
const DomainContent = require("../models/DomainContent");

// Get data for a specific domain
// GET /api/domains/:domain
exports.getDomainContent = async (req, res) => {
  try {
    const { domain } = req.params;
    const data = await DomainContent.findOne({ domain });

    if (!data) return res.status(404).json({ message: "Domain not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create / Insert new domain content
// POST /api/domains
exports.createDomainContent = async (req, res) => {
  try {
    const { domain, topics } = req.body;

    // Basic validation
    if (!domain || !topics || !Array.isArray(topics)) {
      return res.status(400).json({ message: "Domain and topics are required, topics must be an array" });
    }

    // Check if domain already exists
    const existing = await DomainContent.findOne({ domain });
    if (existing) {
      return res.status(400).json({ message: "Domain already exists" });
    }

    // Create new document
    const newDomain = new DomainContent({ domain, topics });
    const savedDomain = await newDomain.save();

    res.status(201).json(savedDomain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update single topic inside a domain
// PATCH /api/domains/:domain/topic/:topicId
exports.updateDomainTopic = async (req, res) => {
  try {
    const { domain, topicId } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({
        message: "At least title or content must be provided",
      });
    }

    const updateFields = {};
    if (title) updateFields["topics.$.title"] = title;
    if (content) updateFields["topics.$.content"] = content;

    const updated = await DomainContent.findOneAndUpdate(
      {
        domain,
        "topics._id": topicId,
      },
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Domain or topic not found",
      });
    }

    res.json({
      message: "Topic updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
