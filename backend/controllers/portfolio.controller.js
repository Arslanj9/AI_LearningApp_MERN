const Portfolio = require('../models/portfolio.model.js');

const {
  generatePortfolioHTML,
  generateGitHubReadme,
  generateProjectExplanations
} = require('../services/ai.service.js');

// Generate Portfolio Controller
const generatePortfolio = async (req, res) => {
  try {
    const { formData, userId } = req.body;

    // Validate input
    if (!formData || !formData.fullName) {
      return res.status(400).json({
        error: 'Invalid form data',
        message: 'Full name is required'
      });
    }

    console.log('🎨 Generating portfolio for:', formData.fullName);

    // Generate all content in parallel
    const results = await Promise.all([
      generatePortfolioHTML(formData),
      generateGitHubReadme(formData),
      generateProjectExplanations(formData)
    ]);

    const portfolioHTML = results[0];
    const githubReadme = results[1];
    const projectExplanations = results[2];

    // Create portfolio document
    const portfolio = new Portfolio({
      userId: userId || 'anonymous',
      formData,
      generatedContent: {
        portfolioHTML,
        githubReadme,
        projectExplanations
      }
    });

    // Save to database
    await portfolio.save();

    console.log('✅ Portfolio generated and saved:', portfolio._id);

    // Send response
    res.status(200).json({
      success: true,
      portfolioId: portfolio._id,
      generatedContent: {
        portfolioHTML,
        githubReadme,
        projectExplanations
      }
    });

  } catch (error) {
    console.error('❌ Error generating portfolio:', error);
    res.status(500).json({
      error: 'Failed to generate portfolio',
      details: error.message
    });
  }
};

// Get Portfolio by ID Controller
const getPortfolioById = async (req, res) => {
  try {
    const id = req.params.id;

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        error: 'Portfolio not found',
        message: 'No portfolio found with ID: ' + id
      });
    }

    res.status(200).json({
      success: true,
      portfolio
    });

  } catch (error) {
    console.error('❌ Error fetching portfolio:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio',
      details: error.message
    });
  }
};

// Get User Portfolios Controller
const getUserPortfolios = async (req, res) => {
  try {
    const userId = req.params.userId;

    const portfolios = await Portfolio.find({ userId: userId })
      .sort({ createdAt: -1 })
      .select('-generatedContent'); // Exclude large content from list

    res.status(200).json({
      success: true,
      count: portfolios.length,
      portfolios
    });

  } catch (error) {
    console.error('❌ Error fetching portfolios:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolios',
      details: error.message
    });
  }
};

// Export controllers
module.exports = {
  generatePortfolio,
  getPortfolioById,
  getUserPortfolios
};
