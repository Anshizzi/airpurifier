const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const chokidar = require("chokidar");
const DataModel = require("../data-service/datamodel.js");
const connectDB = require("../data-service/db.js");

// Path to CSV file
const csvFilePath = path.join(__dirname, "sample.csv");

async function processCSV() {
    try {
        await connectDB(); // Ensure database connection

        console.log("🔄 Processing CSV file...");

        const results = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (row) => {
                console.log("📝 Processing row:", row);

                let value = parseFloat(row.value);
                let timestamp = row.timestamp && !isNaN(new Date(row.timestamp).getTime()) ? new Date(row.timestamp) : new Date();

                if (!isNaN(value)) {
                    results.push({ name: row.name, value, timestamp });
                } else {
                    console.warn(`⚠️ Skipping invalid row: ${JSON.stringify(row)}`);
                }
            })
            .on("end", async () => {
                try {
                    if (results.length > 0) {
                        await DataModel.deleteMany({}); // Clear old data
                        await DataModel.insertMany(results);
                        console.log("CSV Data Imported Successfully!");
                    } else {
                        console.warn("No valid data found in CSV.");
                    }
                } catch (err) {
                    console.error("Error inserting CSV data:", err);
                }
            });

    } catch (err) {
        console.error("Error processing CSV:", err);
    }
}

// Watch CSV for Real-Time Changes
chokidar.watch(csvFilePath).on("change", () => {
    console.log("🟠 CSV file changed! Re-processing...");
    processCSV();
});

// Run Process Initially
processCSV();
