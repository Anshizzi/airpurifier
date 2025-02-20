const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: String,
}, { timestamps: true });

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;

