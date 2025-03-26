const express = require("express");
const router = express.Router();
const datacontrollers = require("./datacontrollers");

router.get("/", (req, res) => {
    res.send("Data Service is Running");
});

router.get('/data', datacontrollers.getData);

module.exports = router;