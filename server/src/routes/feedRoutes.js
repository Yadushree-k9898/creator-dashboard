const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  fetchRedditPosts,
  fetchTwitterPosts, // updated to Twitter
  savePost,
  reportPost,
  getSavedPosts,
} = require('../controllers/feedController');
const { sharePost } = require('../controllers/feedController');


// Public routes
router.get('/reddit', fetchRedditPosts);
router.get('/twitter', fetchTwitterPosts); // updated to Twitter

// Protected routes (user must be logged in)
router.post('/save', protect, savePost);
router.post('/report', protect, reportPost);
router.get('/saved', protect, getSavedPosts);
router.post('/share', protect, sharePost);


module.exports = router;
