// csv-service/server.js
const express = require('express');
const app = express();
const port = 3002; // Different port than API Gateway and Data Service

// Import your CSV logic
const { readCSV } = require('./csvReader');
const { updateCSV } = require('./updateCSV');

app.use(express.json());

// Endpoint to read CSV
app.get('/csv/read', async (req, res) => {
  try {
    const data = await readCSV();
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error reading CSV' });
  }
});

// Endpoint to update CSV
app.post('/csv/update', async (req, res) => {
  try {
    const { newData } = req.body;
    await updateCSV(newData);
    res.json({ message: 'CSV updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating CSV' });
  }
});

app.listen(port, () => {
  console.log(`CSV Service running on port ${port}`);
});
