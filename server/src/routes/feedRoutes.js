// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const {
//   fetchRedditPosts,
//   fetchDevtoPosts,
//   savePost,
//   reportPost,
//   getSavedPosts,
// } = require('../controllers/feedController');
// const { sharePost } = require('../controllers/feedController');


// // Public routes
// router.get('/reddit', fetchRedditPosts);
// router.get('/devto', fetchDevtoPosts); 

// // Protected routes (user must be logged in)
// router.post('/save', protect, savePost);
// router.post('/report', protect, reportPost);
// router.get('/saved', protect, getSavedPosts);
// router.post('/share', protect, sharePost);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  fetchRedditPosts,
  fetchDevToPosts,
  savePost,
  reportPost,
  getSavedPosts,
  sharePost
} = require('../controllers/feedController');

// Public routes (no authentication required)
router.get('/reddit', fetchRedditPosts);
router.get('/devto', fetchDevToPosts);

// Protected routes (user must be logged in)
router.post('/save', protect, savePost);
router.post('/report', protect, reportPost);
router.get('/saved', protect, getSavedPosts);
router.post('/share', protect, sharePost);

module.exports = router;
