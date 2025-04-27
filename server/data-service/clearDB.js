const mongoose = require("mongoose");
require("dotenv").config();
const DataModel = require("../datamodel.js"); // ✅ Import Data Model
const connectDB = require("./db.js"); // ✅ Import Database Connection


// ✅ Function to Clear MongoDB Data
const clearDatabase = async () => {
 try {
   await connectDB(); // ✅ Ensure DB is connected
   await DataModel.deleteMany({});
   console.log("✅ Database cleared successfully!");
   process.exit(0); // ✅ Exit the script
 } catch (err) {
   console.error("❌ Error clearing database:", err);
   process.exit(1);
 }
};


// ✅ Run the clear database function
clearDatabase();