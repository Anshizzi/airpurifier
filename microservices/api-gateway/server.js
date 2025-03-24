const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require('dotenv').config({ path: '../.env' });
 // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Proxy requests to the CSV Service
app.use("/csv-service", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));

// ✅ Proxy requests to the Data Service
app.use("/data-service", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));



// ✅ Health check route
app.get('/api/data', async (req, res) => {
  try {
      const data = await DataModel.find();
      res.json(data);
  } catch (err) {
      res.status(500).json({ error: "Error fetching data" });
  }
});

// Start API Gateway
app.listen(PORT, () => {
  console.log(`🌍 API Gateway running on http://localhost:${PORT}`);
});
