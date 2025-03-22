const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../data-service/db"); // Ensure this connects to MongoDB
const DataModel = require("../data-service/datamodel.js"); // Your MongoDB model
const { readCSV } = require("./csvReader"); // Ensure CSV processing works
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Process CSV on Server Start
readCSV();

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("✅ Server is Running! Use /api/data to fetch data.");
});

// ✅ API Route to Fetch Data from MongoDB
app.get("/api/data", async (req, res) => {
    try {
        const data = await DataModel.find(); // Fetch all data
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});




