const express = require("express");
const router = express.Router();
const datacontrollers = require("./datacontrollers");

// ✅ Default route to check if the API is running
router.get("/", (req, res) => {
    res.send("✅ Data Service is Running");
});

// ✅ API to fetch sensor data
router.get('/data', datacontrollers.getData);

module.exports = router;
