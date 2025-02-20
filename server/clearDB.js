const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const Data = require("./models/Data"); // Adjust path based on your project structure

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB. Deleting data...");
    
    await Data.deleteMany({}).maxTimeMS(5000); // Set a 5s timeout
    console.log("Database cleared successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error clearing database:", error);
    mongoose.connection.close();
  }
}

clearDatabase();
