require('dotenv').config();
const app = require('./src/app');
const mongoose = require('./src/config/db');
const watchCSV = require('./src/utilis/csvReader');
const updateCSV = require('./src/utilis/updateCSV'); // Simulated data updates

const PORT = process.env.PORT || 5000;

// Watch the CSV file for real-time updates
watchCSV();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
