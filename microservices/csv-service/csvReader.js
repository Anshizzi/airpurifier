const fs = require('fs');
const csv = require('csv-parser');
const DataModel = require('../data-service/datamodel');
const path = require('path');

const csvFilePath = path.join(__dirname, './sample.csv');

// Read and update MongoDB from CSV
const readCSV = async () => {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv({ headers: ['name', 'value', 'timestamp'], skipLines: 1 }))
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      await DataModel.deleteMany({}); // Clear old data
      await DataModel.insertMany(results);
      console.log('CSV data updated in the database');
    });
};
module.exports = { readCSV };

// Watch for CSV changes