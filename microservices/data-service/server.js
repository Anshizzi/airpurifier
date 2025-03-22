const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());
console.log("MONGO_URI:", process.env.MONGO_URI);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

  app.get("/api/data", (req, res) => {
    res.send("✅ Data Service is Running!");
  });
  

// Routes
const dataRoutes = require("./dataroutes");
app.use('/api/data', dataRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`📡 Data Service running on port ${PORT}`);
});

