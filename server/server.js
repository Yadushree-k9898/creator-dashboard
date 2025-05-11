
require('dotenv').config();               // 1️⃣ Load .env first

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');  // 2️⃣ For req.cookies
const connectDB = require('./src/config/db');

// Import routes
const authRoutes  = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes  = require('./src/routes/userRoutes');
const feedRoutes  = require('./src/routes/feedRoutes');

// Import Redis client (just to initialize it)
require('./src/config/redisClient');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: ['https://creator-dashboard-ruddy.vercel.app'], // Add your frontend domain here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true, // Allow cookies
}));

// Body & Cookie parsers
app.use(express.json());       // built-in JSON parser (replaces bodyParser.json)
app.use(cookieParser());       // parses cookies into req.cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/feed', feedRoutes);

// Global error handler (optional)
// app.use(require('./src/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
