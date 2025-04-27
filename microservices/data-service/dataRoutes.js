// dataRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData
} = require('./datacontrollers');

// 🔥 Health check route
router.get('/ping', (req, res) => {
  res.send('🏓 Data Service is alive!');
});

// ✅ Existing routes
router.get('/', getAllData);
router.get('/:id', getDataById);
router.post('/', createData);
router.put('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;

