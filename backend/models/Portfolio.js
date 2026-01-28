const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'anonymous'
    },
    formData: {
      fullName: {
        type: String,
        required: true
      },
      title: String,
      bio: String,
      skills: String,
      projects: [
        {
          name: String,
          description: String,
          tech: String,
          github: String,
          live: String
        }
      ],
      experience: String
    },
    generatedContent: {
      portfolioHTML: String,
      githubReadme: String,
      projectExplanations: [
        {
          projectName: String,
          readme: String
        }
      ]
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
