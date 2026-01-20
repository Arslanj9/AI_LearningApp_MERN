const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load env
dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js"); 
const domainContentRoutes = require("./routes/domain.route.js");
const roadmapRoutes = require("./routes/roadmap.routes.js")

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

app.get("/test", (req, res) => {
  res.send("Backend reachable!");
});


// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});


// ---PDF---
// ===START===
// Serve static files (PDFs)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Example API route for domain
app.get("/api/domains/:domain", (req, res) => {
  const { domain } = req.params;

  // Example response
  if (domain === "AI") {
    res.json({
      domain: "Artificial Intelligence",
      topics: [
        { _id: 1, title: "Introduction to AI", content: "AI basics..." },
        { _id: 2, title: "Machine Learning", content: "ML basics..." },
      ],
      pdf: "/uploads/ai_guide.pdf", // PDF path relative to server
    });
  } else {
    res.status(404).json({ message: "Domain not found" });
  }
});
// ---END----


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
