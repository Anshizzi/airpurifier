const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Load environment variables from the main microservice folder
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging: Log MongoDB connection string
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Data Service is Running!");
});

// ✅ API Routes
const dataRoutes = require("./dataroutes");
app.use("/api", dataRoutes); // Ensuring all routes are correctly prefixed

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Data Service running on port ${PORT}`);
});