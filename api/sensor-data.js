const app = require('../server/api-gateway/server');
const express = require('express');
const router = express.Router();

// Forwarding request to the main app
module.exports = (req, res) => {
  app._router.handle(req, res);
};
