const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Use Vercel's tmp directory for CSV storage in production
const DATA_DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname);

// CSV file paths
const SENSOR_DATA_FILE = path.join(DATA_DIR, 'sample.csv');
const USERS_FILE = path.join(DATA_DIR, 'users.csv');

// Ensure the CSV files exist
function ensureFileExists(filePath, defaultContent) {
  try {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, defaultContent, 'utf8');
      console.log(`Created ${filePath}`);
    }
  } catch (error) {
    console.error(`Error creating file ${filePath}:`, error);
  }
}

// Initialize CSV files
function initializeFiles() {
  ensureFileExists(
    USERS_FILE,
    'email,password\nadmin@example.com,admin123\nuser@example.com,user123'
  );
  
  ensureFileExists(
    SENSOR_DATA_FILE,
    'deviceId,pm25,co2,temperature,timestamp\n1,25,450,22,2023-04-28T10:00:00Z\n2,30,500,23,2023-04-28T10:05:00Z'
  );
}

// Read users from CSV
function readUsers() {
  return new Promise((resolve, reject) => {
    const results = [];
    if (!fs.existsSync(USERS_FILE)) {
      initializeFiles();
    }
    
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

// Generic request handler for Vercel serverless function
module.exports = async (req, res) => {
  // Initialize files
  initializeFiles();
  
  // Handle endpoints based on request path and method
  const { path: reqPath, method } = req;
  
  // Login endpoint
  if (reqPath === '/api/csv-service/auth/login' && method === 'POST') {
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
  }
  
  // Signup endpoint
  else if (reqPath === '/api/csv-service/auth/signup' && method === 'POST') {
    try {
      const { email, password } = req.body;
      const users = await readUsers();
      
      if (users.some(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }
      
      users.push({ email, password });
      writeUsers(users);
      
      res.json({ success: true, email });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  
  // Sensor data endpoint
  else if (reqPath === '/api/csv-service/sensor-data' && method === 'GET') {
    try {
      const results = [];
      
      if (!fs.existsSync(SENSOR_DATA_FILE)) {
        initializeFiles();
      }
      
      fs.createReadStream(SENSOR_DATA_FILE)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const formattedData = results.map(row => ({
            time: new Date(row.timestamp).toLocaleTimeString(),
            value: parseFloat(row.pm25)
          }));
          res.json(formattedData);
        })
        .on('error', (err) => {
          console.error('Error reading CSV:', err);
          res.status(500).json({ message: 'Error reading CSV' });
        });
    } catch (error) {
      console.error('Sensor data error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
  // Default response for unknown endpoints
  else {
    res.status(404).json({ message: 'Endpoint not found' });
  }
};
