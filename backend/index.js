const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env
dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.route.js");
const adminRoutes = require("./routes/admin.route.js"); // 👈 ADD THIS

// Connect to MongoDB
connectDB();

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // 👈 ADD THIS

// Health Check
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
