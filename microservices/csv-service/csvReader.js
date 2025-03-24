const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const chokidar = require('chokidar');
const DataModel = require('../data-service/datamodel');

const csvFilePath = path.join(__dirname, './sample.csv');

// ✅ Generate random values for each "server"
const generateServerData = () => {
    return [
        { server: "Server 1", value: Math.floor(Math.random() * 500) + 1, timestamp: new Date().toISOString() },
        { server: "Server 2", value: Math.floor(Math.random() * 500) + 1, timestamp: new Date().toISOString() },
        { server: "Server 3", value: Math.floor(Math.random() * 500) + 1, timestamp: new Date().toISOString() }
    ];
};

// ✅ Function to write the updated values to CSV
const updateCSVWithServers = () => {
    const data = generateServerData();
    const csvContent = "server,value,timestamp\n" + data.map(row => `${row.server},${row.value},${row.timestamp}`).join("\n");
    
    fs.writeFileSync(csvFilePath, csvContent);
    console.log("🟢 CSV updated with new values for Server 1, 2, and 3!");
};

// ✅ Function to process CSV and update MongoDB
const processCSV = async () => {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv({ headers: ['server', 'value', 'timestamp'], skipLines: 1 }))
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await DataModel.deleteMany({}); // Clear old data
                await DataModel.insertMany(results);
                console.log('✅ CSV data updated in the database');
            } catch (err) {
                console.error('❌ Error updating MongoDB:', err);
            }
        });
};

// ✅ Watch for CSV file changes
chokidar.watch(csvFilePath).on('change', () => {
    console.log('🟠 CSV file changed! Updating...');
    processCSV();
});

// ✅ Automatically update CSV every 5 seconds
setInterval(() => {
    updateCSVWithServers();
}, 5000); // Updates every 5 seconds

// ✅ Initial processing on startup
updateCSVWithServers();
processCSV();

module.exports = { processCSV };
