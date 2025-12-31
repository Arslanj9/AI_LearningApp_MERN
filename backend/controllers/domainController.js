// controllers/domainController.js
const DomainContent = require("../models/DomainContent");

// Get data for a specific domain
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
