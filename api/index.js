const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// Define CSV service URL based on environment
const CSV_SERVICE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/csv-service` : '/api/csv-service'
  : 'http://localhost:5001';

app.get('/api', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running 🚀' });
});

app.get('/api/sensor-data', async (req, res) => {
  try {
    const response = await axios.get(`${CSV_SERVICE_URL}/sensor-data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    res.status(500).json({ message: 'Failed to fetch sensor data' });
  }
});

module.exports = app;
