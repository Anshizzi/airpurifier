const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const DataModel = require('./DataModel');
const processCSV = require('./updateCSV');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

app.use(express.json());

// API to Fetch Data from Database
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

// Run CSV Processing on Server Start
processCSV();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


