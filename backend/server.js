import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js"; // ✅ ADD THIS
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

connectDB();

const app = express();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // ✅ ADD THIS
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("JWT:", process.env.JWT_SECRET);
});