// routes/domain.route.js
const express = require("express");
const router = express.Router();
const domainController = require("../controllers/domainController");

router.get("/:domain", domainController.getDomainContent);
router.post("/", domainController.createDomainContent);

module.exports = router;
