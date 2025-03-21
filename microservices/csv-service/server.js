const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Start CSV Updater
require("./updateCSV");

app.get("/", (req, res) => {
  res.send("CSV Service is Running & Updating Data!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ CSV Service running on http://localhost:${PORT}`);
});

