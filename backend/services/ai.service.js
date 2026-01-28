const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Generate Portfolio HTML
const generatePortfolioHTML = async (formData) => {
  const prompt =
    'You are a professional web developer. Generate a beautiful, modern, single-page portfolio website in pure HTML with inline CSS and JavaScript.\n\n' +
    'User Information:\n' +
    '- Name: ' + formData.fullName + '\n' +
    '- Title: ' + formData.title + '\n' +
    '- Bio: ' + formData.bio + '\n' +
    '- Skills: ' + formData.skills + '\n' +
    '- Projects: ' + JSON.stringify(formData.projects, null, 2) + '\n' +
    '- Experience: ' + formData.experience + '\n\n' +
    'Requirements:\n' +
    '1. Create a modern, responsive design with smooth animations\n' +
    '2. Use a professional color scheme (blues, purples, or dark theme)\n' +
    '3. Include sections: Hero, About, Skills, Projects, Experience, Contact\n' +
    '4. Make it mobile-responsive using media queries\n' +
    '5. Add smooth scroll effects and hover animations\n' +
    '6. Include social media placeholders (LinkedIn, GitHub, Email)\n' +
    '7. Use modern CSS (flexbox, grid, gradients, shadows)\n' +
    '8. NO external dependencies - pure HTML/CSS/JS only\n' +
    '9. Skills should be displayed as tags/badges\n' +
    '10. Projects should have cards with hover effects showing description\n' +
    '11. Add a navigation bar with smooth scrolling to sections\n' +
    '12. Include a footer with contact information\n' +
    '13. Use professional typography (system fonts)\n' +
    '14. Add subtle parallax or scroll animations\n\n' +
    'Return ONLY the complete HTML code, nothing else.';

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 8000
  });

  return completion.choices[0].message.content;
};

// Generate GitHub README
const generateGitHubReadme = async (formData) => {
  const prompt =
    'You are a professional developer. Generate a comprehensive GitHub profile README.md for this person.\n\n' +
    'User Information:\n' +
    '- Name: ' + formData.fullName + '\n' +
    '- Title: ' + formData.title + '\n' +
    '- Bio: ' + formData.bio + '\n' +
    '- Skills: ' + formData.skills + '\n' +
    '- Projects: ' + JSON.stringify(formData.projects, null, 2) + '\n' +
    '- Experience: ' + formData.experience + '\n\n' +
    'Requirements:\n' +
    '1. Start with an engaging header with animated typing effect or banner\n' +
    '2. Add a professional introduction (2-3 sentences)\n' +
    '3. Include a "🛠️ Tech Stack" section with skill badges\n' +
    '4. Add a "🚀 Featured Projects" section\n' +
    '5. Include GitHub stats using github-readme-stats\n' +
    '6. Add a "📫 Connect with Me" section\n' +
    '7. Use emojis appropriately\n' +
    '8. Add Experience or Education section\n' +
    '9. Add GitHub Activity Graph\n' +
    '10. Make it visually appealing\n' +
    '11. Add a fun fact at the end\n\n' +
    'IMPORTANT: Use "USERNAME" as placeholder for GitHub username.\n\n' +
    'Return ONLY the markdown code for README.md.';

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    max_tokens: 4000
  });

  return completion.choices[0].message.content;
};

// Generate Project Explanations
const generateProjectExplanations = async (formData) => {
  const explanations = [];

  for (let i = 0; i < formData.projects.length; i++) {
    const project = formData.projects[i];

    if (!project.name || !project.description) continue;

    const prompt =
      'You are a technical writer. Create a detailed, professional README.md for this project.\n\n' +
      'Project Information:\n' +
      '- Name: ' + project.name + '\n' +
      '- Description: ' + project.description + '\n' +
      '- Technologies: ' + project.tech + '\n' +
      '- GitHub: ' + (project.github || 'Not provided') + '\n' +
      '- Live Demo: ' + (project.live || 'Not provided') + '\n\n' +
      'Requirements:\n' +
      'Create a comprehensive README with proper markdown formatting, badges, code examples, screenshots placeholders, and emojis.\n\n' +
      'Return ONLY the markdown code for this project README.md.';

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 3000
    });

    explanations.push({
      projectName: project.name,
      readme: completion.choices[0].message.content
    });
  }

  return explanations;
};

// Export services
module.exports = {
  generatePortfolioHTML,
  generateGitHubReadme,
  generateProjectExplanations
};
