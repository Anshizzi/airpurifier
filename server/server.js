require('dotenv').config();
const app = require('./src/app');
const mongoose = require('./src/config/db');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Wait for 5 seconds before failing
  socketTimeoutMS: 45000,         // Keep the connection alive for 45s
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Connection Error:", err));

const watchCSV = require('./src/utilis/csvReader');
const updateCSV = require('./src/utilis/updateCSV'); // Simulated data updates

const PORT = process.env.PORT || 5001;

// Watch the CSV file for real-time updates
watchCSV();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
