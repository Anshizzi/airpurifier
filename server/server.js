const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Fixing Multiple Connection Issue)
const mongoURI = process.env.MONGO_URI || "your-mongodb-uri-here";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Call the function to connect to MongoDB
connectDB();

// Sample Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

