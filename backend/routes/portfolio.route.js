const express = require('express');

const {
  generatePortfolio,
  getPortfolioById,
  getUserPortfolios
} = require('../controllers/portfolio.controller.js');

const router = express.Router();

// Generate new portfolio
router.post('/generate-portfolio', generatePortfolio);

// Get portfolio by ID
router.get('/portfolio/:id', getPortfolioById);

// Get all portfolios for a user
router.get('/portfolios/:userId', getUserPortfolios);

module.exports = router;
