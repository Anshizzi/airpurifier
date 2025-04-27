const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config({ path: '../../.env' });

const app = express();
const PORT = process.env.CSV_SERVICE_PORT || 5001;

app.use(express.json());
app.use(cors());

const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/tmp' 
  : path.join(__dirname);

const SENSOR_DATA_FILE = path.join(DATA_DIR, 'sample.csv');
const USERS_FILE = path.join(DATA_DIR, 'users.csv');

// Ensure the CSV files exist
function ensureFileExists(filePath, defaultContent) {
    if (!fs.existsSync(filePath)) {
      // Create directory if it doesn't exist (for /tmp in production)
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, defaultContent, 'utf8');
      console.log(`Created ${filePath}`);
    }
  }
// Create users.csv if it doesn't exist
ensureFileExists(
    USERS_FILE,
    'email,password\nadmin@example.com,admin123\nuser@example.com,user123'
  );

// Create sample.csv if it doesn't exist
ensureFileExists(
    SENSOR_DATA_FILE,
    'deviceId,pm25,co2,temperature,timestamp\n1,25,450,22,2023-04-28T10:00:00Z'
  );;

// Write data to sensor CSV
function writeSensorCSV(data) {
  const csvRows = data.map(row => 
    `${row.deviceId},${row.pm25},${row.co2},${row.temperature},${row.timestamp}`
  );
  const csvContent = `deviceId,pm25,co2,temperature,timestamp\n${csvRows.join('\n')}`;
  fs.writeFileSync(SENSOR_DATA_FILE, csvContent, 'utf8');
}

// Read users from CSV
function readUsers() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(USERS_FILE)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Write users to CSV
function writeUsers(users) {
  const csvRows = users.map(user => `${user.email},${user.password}`);
  const csvContent = `email,password\n${csvRows.join('\n')}`;
  fs.writeFileSync(USERS_FILE, csvContent, 'utf8');
}

// Service health check
app.get('/', (req, res) => {
  res.send('✅ CSV Service Running on Port 5001');
});

// Authentication endpoints
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readUsers();
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      res.json({ success: true, email: user.email });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Add new user
    users.push({ email, password });
    writeUsers(users);
    
    res.json({ success: true, email });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Sensor data endpoints
app.get('/read-csv', (req, res) => {
  fs.readFile(SENSOR_DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV:', err);
      return res.status(500).json({ message: "Error reading CSV" });
    }
    res.send(data);
  });
});

app.post('/update-csv', (req, res) => {
  const newData = req.body;
  if (!Array.isArray(newData)) {
    return res.status(400).json({ message: "Data should be an array of devices" });
  }
  
  writeSensorCSV(newData);
  res.json({ message: 'CSV updated successfully' });
});

// Formatted sensor data for the frontend
app.get('/sensor-data', (req, res) => {
  const results = [];
  fs.createReadStream(SENSOR_DATA_FILE)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // Format the data for the frontend
      const formattedData = results.map(row => ({
        time: new Date(row.timestamp).toLocaleTimeString(),
        value: parseFloat(row.pm25)  // Using PM2.5 as the primary value
      }));
      res.json(formattedData);
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
      res.status(500).json({ message: 'Error reading CSV' });
    });
});


module.exports = app;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 CSV Service running on http://localhost:${PORT}`);
    });
  }