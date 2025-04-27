const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const CSV_SERVICE_URL = 'http://localhost:5001';

app.get('/', (req, res) => {
  res.send('API Gateway is running 🚀');
});

// Auth Routes
app.post('/auth/login', async (req, res) => {
  try {
    const response = await axios.post(`${CSV_SERVICE_URL}/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to login' });
  }
});

app.post('/auth/signup', async (req, res) => {
  try {
    const response = await axios.post(`${CSV_SERVICE_URL}/auth/signup`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to signup' });
  }
});

// Data Routes
app.get('/sensor-data', async (req, res) => {
  try {
    const response = await axios.get(`${CSV_SERVICE_URL}/sensor-data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    res.status(500).json({ message: 'Failed to fetch sensor data' });
  }
});

app.listen(PORT, () => {
  console.log(`🌍 API Gateway running on http://localhost:${PORT}`);
});
