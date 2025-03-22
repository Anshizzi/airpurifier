const express = require("express");
const router = express.Router();
const { getData } = require("../controllers/dataController");


// ✅ API to fetch sensor data
router.get("/data",  dataController.getData);


module.exports = router;