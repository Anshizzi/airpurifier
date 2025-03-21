const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Proxy requests to the CSV Service
app.use("/csv", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));

// ✅ Proxy requests to the Data Service
app.use("/api", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));

// ✅ Proxy requests to the Notification Service (if used)
app.use(
  "/ws",
  createProxyMiddleware({ target: "http://localhost:5003", ws: true, changeOrigin: true })
);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 API Gateway is running!");
});

// Start API Gateway
app.listen(PORT, () => {
  console.log(`🌍 API Gateway running on http://localhost:${PORT}`);
});
