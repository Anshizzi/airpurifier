// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5002;
const mongoURI = process.env.MONGO_URI;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit if DB connection fails
});

// Import and use your routes
const dataRoutes = require('./dataRoutes');
app.use('/data', dataRoutes);

// Add a simple GET / route
app.get('/', (req, res) => {
    res.send('Welcome to the Data Service 📡');
});

// Start server and bind to your fixed IP
const HOST = '172.16.112.20';

app.listen(port, HOST, () => {
    console.log(`📡 Data Service running on http://${HOST}:${port}`);
});


