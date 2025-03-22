const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    value: Number,
    timestamp: Date
});

const DataModel = mongoose.model('DataModel', dataSchema); // ✅ Correct usage

module.exports = DataModel;
