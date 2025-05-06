// const express = require('express');
// const { register, login, logout, fetchCurrentUser } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();


// router.post('/register', register);


// router.post('/login', login);


// router.post('/logout', logout);


// router.get('/me', protect, fetchCurrentUser);

// module.exports = router;



const express = require('express');
const { register, login, logout, fetchCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { refreshAccessToken } = require('../controllers/refreshTokenController'); // Import the refreshAccessToken controller
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, fetchCurrentUser);

router.post('/refresh-token', refreshAccessToken);// Route to refresh access token

module.exports = router;
