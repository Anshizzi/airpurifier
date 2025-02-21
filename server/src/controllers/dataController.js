const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, '../../data/sample.csv'); // ✅ Correct path

// ✅ Function to read data from CSV
const getData = (req, res) => {
    let results = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (err) => {
            console.error("❌ Error reading CSV file:", err);
            res.status(500).json({ message: "Error reading CSV file" });
        });
};

// ✅ Function to update CSV file
const updateCSV = (req, res) => {
    const newData = req.body;
    
    // Convert object to CSV row
    const csvRow = `\n${newData.id},${newData.name},${newData.score}`;

    fs.appendFile(csvFilePath, csvRow, (err) => {
        if (err) {
            console.error("❌ Error updating CSV:", err);
            return res.status(500).json({ message: "Failed to update CSV" });
        }
        res.json({ message: "CSV updated successfully" });
    });
};

module.exports = { getData, updateCSV };


