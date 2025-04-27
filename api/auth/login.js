const express = require('express');
const cors = require('cors');
const axios = require('axios');
const csvServiceHandler = require('../csv-service');

const app = express();
app.use(express.json());
app.use(cors());

// Define CSV service URL based on environment
const CSV_SERVICE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/csv-service` : '/api/csv-service'
  : 'http://localhost:5001';

module.exports = async (req, res) => {
  try {
    const response = await axios.post(`${CSV_SERVICE_URL}/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Failed to login' });
  }
};
module.exports = async (req, res) => {
    // Modify the request path to match what csv-service expects
    req.path = '/api/csv-service/auth/login';
    
    // Forward directly to the CSV service handler
    return csvServiceHandler(req, res);
  };