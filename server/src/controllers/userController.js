const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { 
  awardLoginCredits,
  awardProfileCompletionCredits,
  awardSavePostCredits,
  awardReportPostCredits
} = require('../services/creditService');
const SavedPost = require('../models/SavedPost');
// const Credits = require('../models/Credits');
const ActivityLog = require('../models/ActivityLog');


// @desc    Get current user's profile
// @route   GET /api/users/profile
// @access  Private (User, Admin)
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Award daily login credits
    await awardLoginCredits(user);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio || '',
      credits: user.credits || 0,
      profileCompleted: user.profileCompleted || false,
      lastLogin: user.lastLogin,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update current user's profile
// @route   PUT /api/users/profile
// @access  Private (User)
exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, bio, email } = req.body;

    // Update user profile fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (email) user.email = email;

    // Save the basic profile changes first
    await user.save();
    
    // Award profile completion credits if applicable
    // The credit service will handle updating both the Credits and User schemas
    const credits = await awardProfileCompletionCredits(user._id);

    // Award daily login credits (if not already awarded today)
    // The credit service will handle updating both the Credits and User schemas
    await awardLoginCredits(user._id);

    // Get the updated user with the latest credit information
    const updatedUser = await User.findById(user._id);

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        role: updatedUser.role,
        credits: updatedUser.credits,
        profileCompleted: updatedUser.profileCompleted,
        lastLogin: updatedUser.lastLogin,
      },
      token: generateToken(updatedUser), // Optional: regenerate token after update
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Save a post to user's saved posts
// @route   POST /api/users/save-post
// @access  Private (User)
exports.savePost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { postId, source, title, url, content } = req.body;

    // Create a new SavedPost entry
    const savedPost = new SavedPost({
      user: user._id,
      postId,
      source,
      title,
      url,
      content,
    });

    // Save the saved post
    await savedPost.save();

    // Add the post to the user's saved posts array (optional)
    user.savedPosts.push(savedPost._id);
    await user.save();

    // Award credits for saving a post
    // The credit service will handle updating both the Credits and User schemas
    const credits = await awardSavePostCredits(user._id);
    
    // Get the updated user with the latest credit information
    const updatedUser = await User.findById(user._id);

    res.status(200).json({
      message: 'Post saved successfully',
      savedPost,
      credits: updatedUser.credits
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's activity log
// @route   GET /api/users/activity-log
// @access  Private (User)
exports.getActivityLog = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id); // Get current user
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Retrieve the user's activity logs
    const activityLogs = await ActivityLog.find({ user: user._id }).sort({ timestamp: -1 }); // Sort by most recent activity

    res.status(200).json(activityLogs);
  } catch (err) {
    next(err);
  }
};

// @desc    Report a saved post
// @route   PUT /api/users/report-post/:postId
// @access  Private (User)
exports.reportPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const savedPost = await SavedPost.findOne({ _id: postId, user: user._id });
    if (!savedPost) return res.status(404).json({ message: 'Post not found' });

    savedPost.reported = true; // Flag the post as reported
    await savedPost.save();

    // Award credits for reporting the post
    // The credit service will handle updating both the Credits and User schemas
    const credits = await awardReportPostCredits(user._id);
    
    // Get the updated user with the latest credit information
    const updatedUser = await User.findById(user._id);

    res.status(200).json({ 
      message: 'Post has been reported',
      credits: updatedUser.credits
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's dashboard (overview)
// @route   GET /api/users/dashboard
// @access  Private (User)
// exports.getUserDashboard = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('name email role createdAt');

//     // Fetch user's credit details
   
//     // const creditDetails = await User.findById(req.user._id).
//     // Get saved posts
//     const savedPosts = await SavedPost.find({ user: req.user._id })
//       .sort('-createdAt')
//       .limit(5)
//       .select('title link source createdAt');

//     // Get recent activity logs
//     const activityLogs = await ActivityLog.find({ user: req.user._id })
//       .sort('-createdAt')
//       .limit(5)
//       .select('action details createdAt');

//     res.status(200).json({
//       profile: {
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         createdAt: user.createdAt,
//       },
//       credits: user.credits,  
//       savedPosts,
//       activityLogs,

//     });
//   } catch (error) {
//     console.error('Error fetching user dashboard', error.message);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


exports.getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('name email role createdAt credits');
         

    const savedPosts = await SavedPost.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(5)
      .select('title link source createdAt');

    const activityLogs = await ActivityLog.find({ user: req.user._id })
      .sort('-createdAt')
      .limit(5)
      .select('action details createdAt');

    res.status(200).json({
      profile: {
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      credits: user.credits,   // Now this will show properly
      savedPosts,
      activityLogs,
    });
  } catch (error) {
    console.error('Error fetching user dashboard', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
