const express = require('express');
const cors = require('cors');
const axios = require('axios');

// For handling requests in serverless environment
module.exports = async (req, res) => {
  try {
    // If in Vercel environment, construct URL using VERCEL_URL
    const CSV_SERVICE_URL = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}/csv-service` 
      : 'http://localhost:5001';
      
    const response = await axios.get(`${CSV_SERVICE_URL}/sensor-data`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({ message: 'Failed to fetch sensor data' });
  }
};
