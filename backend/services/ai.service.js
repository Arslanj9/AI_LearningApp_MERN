const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Generate Portfolio HTML
const generatePortfolioHTML = async (formData) => {
  const prompt =
    'You are an expert web designer and developer specializing in creating stunning portfolio websites. Generate a professional, modern, single-page portfolio website in pure HTML with inline CSS and JavaScript.\n\n' +
    'User Information:\n' +
    '- Name: ' + formData.fullName + '\n' + 
    '- Title: ' + formData.title + '\n' +
    '- Bio: ' + formData.bio + '\n' +
    '- Skills: ' + formData.skills + '\n' +
    '- Projects: ' + JSON.stringify(formData.projects, null, 2) + '\n' +
    '- Experience: ' + formData.experience + '\n\n' +
    'DESIGN REQUIREMENTS:\n\n' +
    '1. LAYOUT & STRUCTURE:\n' +
    '   - Clean, spacious layout with generous white space\n' +
    '   - Consistent spacing (use 80-120px vertical spacing between sections)\n' +
    '   - Max-width container (1200px) for content readability\n' +
    '   - Sticky navigation bar with smooth transitions\n\n' +
    '2. COLOR SCHEME (choose ONE cohesive palette):\n' +
    '   - Option A: Dark mode with accent color (e.g., #0a192f background, #64ffda accent)\n' +
    '   - Option B: Light & minimal (white background, #2563eb primary, #1e293b text)\n' +
    '   - Option C: Gradient theme (subtle gradients, modern purples/blues)\n' +
    '   - Ensure proper contrast ratios (WCAG AA compliant)\n\n' +
    '3. TYPOGRAPHY:\n' +
    '   - Use system font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif\n' +
    '   - Clear hierarchy: H1 (48-64px), H2 (36-48px), H3 (24-30px), body (16-18px)\n' +
    '   - Line height: 1.6-1.8 for body text\n' +
    '   - Professional font weights (400, 500, 600, 700)\n\n' +
    '4. HERO SECTION:\n' +
    '   - Full viewport height with centered content\n' +
    '   - Large, bold name display\n' +
    '   - Animated text or typing effect for title\n' +
    '   - Clear CTA button (e.g., "View My Work", "Get In Touch")\n' +
    '   - Subtle background pattern or gradient\n\n' +
    '5. SKILLS SECTION:\n' +
    '   - Display as pill-shaped badges with subtle shadows\n' +
    '   - Group by category if multiple skill types\n' +
    '   - Smooth hover effects (slight scale/color change)\n' +
    '   - Clean grid layout (4-5 columns on desktop, responsive)\n\n' +
    '6. PROJECTS SECTION:\n' +
    '   - Card-based layout (grid: 2-3 columns on desktop)\n' +
    '   - Each card should have:\n' +
    '     * Project thumbnail/icon area (use colored gradients as placeholders)\n' +
    '     * Clear title and brief description\n' +
    '     * Technology tags\n' +
    '     * Hover effect revealing more details or lifting card with shadow\n' +
    '   - Border-radius: 12-16px for modern look\n\n' +
    '7. ANIMATIONS & INTERACTIONS:\n' +
    '   - Smooth scroll behavior (scroll-behavior: smooth)\n' +
    '   - Fade-in animations on scroll (use Intersection Observer)\n' +
    '   - Subtle hover effects (transform: translateY(-4px), increased shadows)\n' +
    '   - Transitions: 0.3s ease for most interactions\n' +
    '   - Navigation highlight on scroll to section\n\n' +
    '8. RESPONSIVE DESIGN:\n' +
    '   - Mobile-first approach\n' +
    '   - Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)\n' +
    '   - Stack cards/grid on mobile\n' +
    '   - Hamburger menu for mobile navigation\n' +
    '   - Touch-friendly button sizes (min 44px)\n\n' +
    '9. PROFESSIONAL TOUCHES:\n' +
    '   - Subtle box shadows (not too heavy)\n' +
    '   - Consistent border-radius throughout\n' +
    '   - Loading/transition states\n' +
    '   - Social links with icon placeholders (use CSS shapes or Unicode)\n' +
    '   - Back-to-top button\n' +
    '   - Professional footer with links\n\n' +
    '10. CODE QUALITY:\n' +
    '    - Semantic HTML5 elements\n' +
    '    - Clean, well-organized CSS (group by section)\n' +
    '    - NO external dependencies or CDN links\n' +
    '    - Properly indented and commented code\n' +
    '    - Optimized for performance\n\n' +
    'IMPORTANT:\n' +
    '- Make it look like a $5000+ professional portfolio\n' +
    '- Avoid generic templates - be creative and unique\n' +
    '- Every element should serve a purpose\n' +
    '- Test all interactions mentally before finalizing\n\n' +
    'Return ONLY the complete, production-ready HTML code with no explanations, markdown formatting, or code blocks.';

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5, // Reduced for more consistent quality
    max_tokens: 8000,
  });

  // Clean up the response to ensure it's pure HTML
  let htmlContent = completion.choices[0].message.content;
  
  // Remove markdown code blocks if present
  htmlContent = htmlContent.replace(/```html\n?/g, '').replace(/```\n?/g, '');
  
  return htmlContent.trim();
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
