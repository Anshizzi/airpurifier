const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const DataModel = require("../data-service/datamodel.js");
const connectDB = require("../data-service/db.js");

async function processCSV() {
    try {
        await connectDB(); // Ensure database connection before processing

        if (!DataModel || typeof DataModel.deleteMany !== "function") {
            throw new Error("DataModel is not defined correctly.");
        }

        // Clear existing data
        await DataModel.deleteMany({});
        console.log("Old data deleted!");

        const csvFilePath = path.join(__dirname, "./sample.csv");
        const results = [];

        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on("data", (row) => {
                console.log("Processing row:", row);

                let value = parseFloat(row.value);
                let timestamp = row.timestamp && !isNaN(new Date(row.timestamp).getTime()) ? new Date(row.timestamp) : null;

                if (!isNaN(value) && timestamp) {
                    results.push({ name: row.name, value, timestamp });
                } else {
                    console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
                }
            })
            .on("end", async () => {
                try {
                    if (results.length > 0) {
                        await DataModel.insertMany(results);
                        console.log("CSV Data Imported Successfully!");
                    } else {
                        console.warn("No valid data found in CSV.");
                    }
                } catch (err) {
                    console.error("Error inserting CSV data:", err);
                } finally {
                    mongoose.connection.close(); // Close DB connection AFTER inserting
                    console.log("MongoDB Connection Closed.");
                }
            });

    } catch (err) {
        console.error("Error processing CSV:", err);
    }
}

processCSV();
