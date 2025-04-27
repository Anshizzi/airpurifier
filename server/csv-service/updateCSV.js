const fs = require('fs');
const path = require('path');

exports.updateCSV = (req, res) => {
    try {
        const newData = req.body;

        const csvFilePath = path.join(__dirname, 'sample.csv');

        const csvData = newData.map(row => Object.values(row).join(',')).join('\n');

        fs.writeFile(csvFilePath, csvData, (err) => {
            if (err) {
                console.error('Error writing CSV:', err);
                return res.status(500).json({ message: 'Error updating CSV' });
            }
            console.log('CSV updated successfully!');
            res.json({ message: 'CSV updated successfully' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
