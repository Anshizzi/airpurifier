const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: String,
}, { timestamps: true });

module.exports = mongoose.model('Data', DataSchema);
