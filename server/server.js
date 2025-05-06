// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectDB = require('./src/config/db');  // MongoDB connection function
// const dotenv = require('dotenv');

// // Import routes
// const authRoutes = require('./src/routes/authRoutes');
// const adminRoutes = require('./src/routes/adminRoutes');
// const userRoutes = require('./src/routes/userRoutes');  
// const feedRoutes = require('./src/routes/feedRoutes');

// // Import Redis client (config/redisClient.js)
// require('./src/config/redisClient');  // No need to assign, just importing to ensure it's connected

// const app = express();

// // Connect to MongoDB
// connectDB(); 

// // Use middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/feed', feedRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes');
const feedRoutes = require('./src/routes/feedRoutes');

// Import Redis client
require('./src/config/redisClient');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for frontend (with credentials)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  
  credentials: true,
}));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feed', feedRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
