const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

// Path to your CSV file
const CSV_FILE = 'sample.csv';

// Function to write data to CSV
function writeCSV(data) {
    const csvRows = data.map(row => `${row.deviceId},${row.pm25},${row.co2},${row.temperature},${row.timestamp}`);
    const csvContent = `deviceId,pm25,co2,temperature,timestamp\n${csvRows.join('\n')}`;

    fs.writeFileSync(CSV_FILE, csvContent, 'utf8');
}

// In-memory "latest" data store
let devicesData = [];

// 👇 Root route to check service is up
app.get('/', (req, res) => {
    res.send('✅ CSV Service Running on Port 5001');
});

// API to read the CSV
app.get('/read-csv', (req, res) => {
    fs.readFile(CSV_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading CSV:', err);
            return res.status(500).json({ message: "Error reading CSV" });
        }
        res.send(data);
    });
});

// API to update CSV with new data
app.post('/update-csv', (req, res) => {
    const newData = req.body;

    if (!Array.isArray(newData)) {
        return res.status(400).json({ message: "Data should be an array of devices" });
    }

    devicesData = newData;
    writeCSV(devicesData);

    res.json({ message: 'CSV updated successfully' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CSV Service running on http://${getLocalIP()}:${PORT}`);
});

// Helper function to get your machine's local IP address
function getLocalIP() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

