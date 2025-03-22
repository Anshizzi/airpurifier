const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const DataModel = require('../data-service/datamodel');
const connectDB = require('..data-service/db');

connectDB(); // Ensure database connection before processing CSV

const csvFilePath = path.join(__dirname, 'sample.csv');

async function processCSV() {
    try {
        // Ensure DataModel is properly recognized
        if (!DataModel || typeof DataModel.deleteMany !== 'function') {
            throw new Error("DataModel is not defined correctly.");
        }

        // Clear existing data
        await DataModel.deleteMany({});
        console.log("Old data deleted!");

        // Read and insert new data
        const results = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (row) => {
                results.push({
                    name: row.name,
                    value: parseFloat(row.value),
                    timestamp: new Date(row.timestamp)
                });
            })
            .on('end', async () => {
                try {
                    await DataModel.insertMany(results);
                    console.log("CSV Data Imported Successfully!");
                    mongoose.connection.close();
                } catch (err) {
                    console.error("Error inserting CSV data:", err);
                }
            });
    } catch (err) {
        console.error("Error processing CSV:", err);
    }
}

processCSV();


