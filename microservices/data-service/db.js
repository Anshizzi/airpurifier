const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/airpurifier', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1);
    }
};

// Ensure correct export
module.exports = connectDB;


