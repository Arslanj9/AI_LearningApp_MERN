const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env
dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js"); 
const domainContentRoutes = require("./routes/domain.route.js");
const roadmapRoutes = require("./routes/roadmap.routes.js")
const chatbotRoutes = require("./routes/chatbot.routes.js");
const portfolioRoutes = require('./routes/portfolio.route.js');


// Connect to MongoDB
connectDB();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());       
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/domains", domainContentRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.get("/test", (req, res) => {
  res.send("Backend reachable!");
});


// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
