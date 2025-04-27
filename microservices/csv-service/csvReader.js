const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

exports.readCSV = async (req, res) => {
    try {
        const results = [];

        const csvFilePath = path.join(__dirname, '../csv-service/sample.csv'); 
        // Adjust path based on where your CSV is compared to this file

        console.log('Reading CSV from:', csvFilePath);

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log('CSV Read Successfully:', results);
                res.json(results);
            })
            .on('error', (err) => {
                console.error('Error reading CSV:', err.message);
                res.status(500).json({ message: 'Error reading CSV', error: err.message });
            });

    } catch (error) {
        console.error('Unexpected Error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
