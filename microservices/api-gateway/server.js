const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const CSV_SERVICE_URL = 'http://localhost:5001';
const DATA_SERVICE_URL = 'http://localhost:5002';

// API Health Check
app.get('/', (req, res) => {
  res.send('API Gateway is running 🚀');
});

// 1. Get real-time Air Purifier Data from CSV Service
app.get('/devices', async (req, res) => {
  try {
    const response = await axios.get(`${CSV_SERVICE_URL}/read-csv`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching devices:', error.message);
    res.status(500).json({ message: 'Failed to fetch devices' });
  }
});

// 2. (optional) Save devices to MongoDB through Data Service
app.post('/save-devices', async (req, res) => {
  try {
    const response = await axios.post(`${DATA_SERVICE_URL}/add-data`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error saving devices:', error.message);
    res.status(500).json({ message: 'Failed to save devices' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌍 API Gateway running on http://0.0.0.0:${PORT}`);
});

