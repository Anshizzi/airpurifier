const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: String,
});

module.exports = mongoose.model("SensorData", DataSchema);
