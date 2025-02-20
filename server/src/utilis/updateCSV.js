const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../../data/sample.csv');

// Function to generate random data
const generateRandomData = () => {
  const timestamp = new Date().toISOString();
  const randomValue = Math.floor(Math.random() * 100);
  return `Sensor,${randomValue},${timestamp}\n`;
};

// Function to update CSV at intervals
const updateCSV = () => {
  fs.appendFile(csvFilePath, generateRandomData(), (err) => {
    if (err) console.error('Error updating CSV:', err);
    else console.log('CSV updated with new data');
  });
};

// Update CSV every 5 seconds
setInterval(updateCSV, 5000);
