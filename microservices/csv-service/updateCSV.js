const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const DataModel = require("../data-service/datamodel.js");
const connectDB = require("../data-service/db.js");

connectDB(); // Ensure database connection before processing CSV

const csvFilePath = path.join(__dirname, "./sample.csv");

// Function to check if a date is valid
function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

async function processCSV() {
  try {
    if (!DataModel || typeof DataModel.deleteMany !== "function") {
      throw new Error("DataModel is not defined correctly.");
    }

    // Clear existing data
    await DataModel.deleteMany({});
    console.log("Old data deleted!");

    // Read and insert new data
    const results = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        let value = parseFloat(row.value);
        let timestamp = isValidDate(row.timestamp) ? new Date(row.timestamp) : null;

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
          mongoose.connection.close(); // Close DB connection after processing
        } catch (err) {
          console.error("Error inserting CSV data:", err);
        }
      });
  } catch (err) {
    console.error("Error processing CSV:", err);
  }
}

processCSV();

