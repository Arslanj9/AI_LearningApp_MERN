// routes/domain.route.js
const express = require("express");
const router = express.Router();
const domainController = require("../controllers/domain.controller");


router.get("/:domain", domainController.getDomainContent); // GET /api/domains/:domain
router.post("/", domainController.createDomainContent); // POST /api/domains

// Update single topic inside a domain
router.patch("/:domain/topic/:topicId", domainController.updateDomainTopic); //PATCH /api/domains/:domain/topic/:topicId

module.exports = router;
