const express = require('express');
const cors = require('cors');
const axios = require('axios');


const csvServiceHandler = require('./csv-service');

module.exports = async (req, res) => {
  req.path = '/api/csv-service/sensor-data';
  return csvServiceHandler(req, res);
};
