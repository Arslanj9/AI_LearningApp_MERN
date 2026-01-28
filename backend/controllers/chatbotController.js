const Roadmaps = require("../models/Roadmap");
const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// Helper function to search relevant roadmap content
const searchRoadmapContent = async (query) => {
    try {
        const roadmaps = await Roadmaps.find({}).sort({ order: 1 });
        const queryLower = query.toLowerCase();
        const relevantContent = [];

        roadmaps.forEach((roadmap) => {
            const titleMatch = roadmap.title.toLowerCase().includes(queryLower);
            const detailsMatch = roadmap.details?.toLowerCase().includes(queryLower);

            if (titleMatch || detailsMatch) {
                relevantContent.push({
                    type: "main-topic",
                    title: roadmap.title,
                    details: roadmap.details,
                    order: roadmap.order,
                    subTopics: roadmap.subTopics,
                });
            }

            roadmap.subTopics?.forEach((subTopic) => {
                const subTitleMatch = subTopic.title.toLowerCase().includes(queryLower);
                const subDetailsMatch = subTopic.details?.toLowerCase().includes(queryLower);

                if (subTitleMatch || subDetailsMatch) {
                    relevantContent.push({
                        type: "sub-topic",
                        mainTopic: roadmap.title,
                        title: subTopic.title,
                        details: subTopic.details,
                        order: roadmap.order,
                    });
                }
            });
        });

        if (relevantContent.length === 0) {
            return roadmaps.slice(0, 3).map((r) => ({
                type: "main-topic",
                title: r.title,
                details: r.details,
                order: r.order,
                subTopics: r.subTopics,
            }));
        }

        return relevantContent.slice(0, 5);
    } catch (error) {
        console.error("Error searching roadmap content:", error);
        return [];
    }
};

// Format roadmap content for AI context
const formatRoadmapContext = (roadmapData) => {
    if (!roadmapData || roadmapData.length === 0) {
        return "No specific roadmap content found.";
    }

    let context = "Here is the relevant learning roadmap content:\n\n";

    roadmapData.forEach((item, index) => {
        if (item.type === "main-topic") {
            context += `${index + 1}. ${item.title} (Step ${item.order})\n`;
            if (item.details) {
                context += `   Details: ${item.details}\n`;
            }
            if (item.subTopics && item.subTopics.length > 0) {
                context += `   Subtopics:\n`;
                item.subTopics.forEach((sub) => {
                    context += `   - ${sub.title}${sub.details ? ': ' + sub.details : ''}\n`;
                });
            }
        } else if (item.type === "sub-topic") {
            context += `${index + 1}. ${item.title} (from ${item.mainTopic})\n`;
            if (item.details) {
                context += `   Details: ${item.details}\n`;
            }
        }
        context += "\n";
    });

    return context;
};

// Main chat handler
exports.chat = async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Search for relevant roadmap content
        const relevantContent = await searchRoadmapContent(message);
        const roadmapContext = formatRoadmapContext(relevantContent);

        // Prepare messages for Groq
        const messages = [
            {
                role: "system",
                content: `You are a helpful AI/ML learning assistant. You help beginners learn AI and Machine Learning concepts based on a structured roadmap.

${roadmapContext}

Instructions:
- Answer questions based on the roadmap content provided above
- If the user asks about a topic in the roadmap, explain it clearly and mention where it fits in the learning path
- If a topic isn't in the roadmap, still provide a helpful answer but mention it's not part of the current curriculum
- Be encouraging and supportive for beginners
- Use simple language and provide examples when helpful
- If relevant, suggest what topics to learn before or after based on the roadmap order
- Keep responses concise but informative`,
            },
        ];

        // Add conversation history (last 5 messages)
        const recentHistory = conversationHistory.slice(-5);
        recentHistory.forEach((msg) => {
            messages.push({
                role: msg.role,
                content: msg.content,
            });
        });

        // Add current user message
        messages.push({
            role: "user",
            content: message,
        });

        // Call Groq API
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // Fast and capable model
            // Alternative models:
            // "mixtral-8x7b-32768" - Good for longer context
            // "llama-3.1-8b-instant" - Faster, smaller model
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
        });

        const aiResponse = completion.choices[0].message.content;

        res.json({
            success: true,
            response: aiResponse,
            relevantTopics: relevantContent.map((c) => c.title),
        });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({
            error: "Failed to process chat message",
            details: error.message,
        });
    }
};

// Get all roadmap overview
exports.getRoadmapOverview = async (req, res) => {
    try {
        const roadmaps = await Roadmaps.find({}).sort({ order: 1 });

        const overview = roadmaps.map((r) => ({
            title: r.title,
            order: r.order,
            side: r.side,
            subTopicsCount: r.subTopics?.length || 0,
        }));

        res.json({
            success: true,
            roadmap: overview,
        });
    } catch (error) {
        console.error("Error fetching roadmap:", error);
        res.status(500).json({ error: "Failed to fetch roadmap overview" });
    }
};