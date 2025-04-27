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


const csvServiceHandler = require('../csv-service');

module.exports = async (req, res) => {
  req.path = '/api/csv-service/auth/signup';
  return csvServiceHandler(req, res);
};
