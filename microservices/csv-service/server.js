const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../data-service/db');
const DataModel = require('../data-service/datamodel.js');
const processCSV = require('./updateCSV');
const { readCSV } = require('./csvReader'); // ✅ Import csvReader.js

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

app.use(express.json());

// ✅ Process CSV on Server Start
readCSV();

// API to Fetch Data from Database
app.get('/api/data', async (req, res) => {
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});




