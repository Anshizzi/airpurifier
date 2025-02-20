const DataModel = require('../models/DataModel');

exports.getData = async (req, res) => {
  try {
    const data = await DataModel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
};
