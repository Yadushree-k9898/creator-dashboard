// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');  // Import the database connection function
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes');  
const feedRoutes = require('./src/routes/feedRoutes')// Import user routes



const app = express();

// Connect to MongoDB
connectDB();  // This will connect to the database

// Use middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feed', feedRoutes);
  // Assuming you have userRoutes defined

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
