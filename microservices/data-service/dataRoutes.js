const express = require("express");
const router = express.Router();
const datacontrollers = require("./datacontrollers");


// ✅ API to fetch sensor data
router.get("/data",  datacontrollers.getData);


module.exports = router;