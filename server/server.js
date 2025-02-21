const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Import and Use API Routes
const dataRoutes = require("./src/routes/dataRoutes.js");
app.use("/api", dataRoutes); // Now /api/data and /api/update will work

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourDatabase";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }
    
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 30000 });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// Call the function to connect to MongoDB
connectDB();

// ✅ Sample Route to Check Server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


