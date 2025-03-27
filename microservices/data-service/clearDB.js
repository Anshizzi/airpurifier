const mongoose = require("mongoose");
require("dotenv").config();
const DataModel = require("../datamodel.js"); //Import Data Model
const connectDB = require("./db.js"); //Import Database Connection


const clearDatabase = async () => {
 try {
   await connectDB(); 
   await DataModel.deleteMany({});
   console.log("Database cleared successfully!");
   process.exit(0); 
 } catch (err) {
   console.error("rror clearing database:", err);
   process.exit(1);
 }
};


clearDatabase();