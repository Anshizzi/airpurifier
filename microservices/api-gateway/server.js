const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require('dotenv').config({ path: '../.env' }); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root Route (Fix for "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running! Use /csv-service or /data-service to access microservices.");
});

// ✅ Proxy requests to the CSV Processing Service
app.use("/csv-service", createProxyMiddleware({ 
  target: "http://0.0.0.0:5001", 
  changeOrigin: true 
}));

// ✅ Proxy requests to the Data Service
app.use("/data-service", createProxyMiddleware({ 
  target: "http://0.0.0.0:5002", 
  changeOrigin: true 
}));

// ✅ Proxy `/api/data` to Data Service
app.use("/api/data", createProxyMiddleware({ 
  target: "http://0.0.0.0:5002", 
  changeOrigin: true 
}));

// Start API Gateway on all network interfaces
global.HOST = '0.0.0.0';
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌍 API Gateway running on http://${global.HOST}:${PORT}`);
});
