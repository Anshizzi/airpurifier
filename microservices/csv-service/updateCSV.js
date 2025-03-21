const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csv-parser");
require("dotenv").config();
const DataModel = require("../data-service/DataModel"); // ✅ Import from data-service

const csvFilePath = path.join(__dirname, "sample.csv");

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourDatabase";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("✅ Connected to MongoDB from CSV Service"));
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Read CSV & Update MongoDB
const updateMongoDB = async () => {
  try {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv(["name", "value", "timestamp"])) // ✅ Match CSV headers
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        console.log("📂 CSV Parsed:", results);

        // ✅ Clear Old Data & Insert New Data
        await DataModel.deleteMany({});
        await DataModel.insertMany(results);

        console.log("✅ MongoDB Updated with CSV Data");
      });
  } catch (err) {
    console.error("❌ Error updating MongoDB:", err);
  }
};

// ✅ Ensure CSV file exists & has headers
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, "name,value,timestamp\n", { flag: "wx" });
}

// ✅ Function to generate and append new CSV data
const generateRandomData = () => {
  const timestamp = new Date().toISOString();
  const randomValue = Math.floor(Math.random() * 100);
  return `Sensor,${randomValue},${timestamp}\n`;
};

const updateCSV = () => {
  fs.appendFile(csvFilePath, generateRandomData(), (err) => {
    if (err) console.error("❌ Error updating CSV:", err);
    else {
      console.log("✅ CSV updated with new data");
      updateMongoDB(); // ✅ Sync MongoDB after update
    }
  });
};

// ✅ Update CSV every 5 seconds
setInterval(updateCSV, 5000);
console.log("📂 CSV Service: Auto-updating CSV & MongoDB every 5 seconds...");

