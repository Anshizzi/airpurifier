const express = require('express');
const { getData, updateCSV } = require('../controllers/dataController'); // Ensure updateCSV is correctly imported

const router = express.Router();

// Route to GET data from CSV
router.get('/data', getData);

// Route to UPDATE the CSV file
router.post('/update', updateCSV); // Ensure updateCSV exists in dataController.js

module.exports = router;

