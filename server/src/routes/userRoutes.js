const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  savePost,  // Save post functionality
  getActivityLog,
  reportPost,
  getUserDashboard
} = require('../controllers/userController');


// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private (User, Admin)
router.get('/profile', protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update profile and award credits on completion
// @access  Private (User)
router.put('/profile', protect, updateProfile);

// @route   POST /api/users/save-post
// @desc    Save a post to user's saved posts
// @access  Private (User)
router.post('/save-post', protect, savePost);  // Add save post route

// @route   GET /api/users/activity
// @desc    Get user's activity log
// @access  Private (User)
router.get('/activity', protect, getActivityLog);  // Add activity log route
router.put('/report-post/:postId', protect, reportPost);


router.get('/dashboard', protect, getUserDashboard);


module.exports = router;
