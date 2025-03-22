const DataModel = require("./datamodel");

exports.getData = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

