const express = require('express');
const { register, login, logout, fetchCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Protect middleware
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route (no protection needed)
router.post('/logout', logout);

// Fetch current user (requires token, so it is protected)
router.get('/me', protect, fetchCurrentUser);

module.exports = router;
