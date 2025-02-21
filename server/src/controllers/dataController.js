const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

const getData = (req, res) => {
    let results = [];
    fs.createReadStream('sample.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
          res.json(results);
      });
};

const updateCSV = (req, res) => {
    const newData = req.body;
    
    fs.appendFile('sample.csv', `\n${newData.id},${newData.name},${newData.score}`, (err) => {
        if (err) {
            console.error("❌ Error updating CSV:", err);
            return res.status(500).json({ message: "Failed to update CSV" });
        }
        res.json({ message: "CSV updated successfully" });
    });
};

module.exports = { getData, updateCSV };

