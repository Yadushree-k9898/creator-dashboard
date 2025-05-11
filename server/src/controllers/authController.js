// const User = require('../models/User');
// const { generateToken } = require('../utils/tokenUtils');
// const { awardLoginCredits } = require('../services/creditService');
// const Credits = require('../models/Credits');
// const { redisClient, ensureConnection } = require('../config/redisClient');

// // Register new user
// exports.register = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create user
//     const user = await User.create({ 
//       name, 
//       email, 
//       password, 
//       role,
//       credits: 0
//     });

//     // Create initial credits document
//     await Credits.create({
//       userId: user._id,
//       totalCredits: 0,
//       loginPoints: 0,
//       interactionPoints: 0,
//       profileCompletionPoints: 0,
//       action: 'REGISTRATION'
//     });

//     const token = generateToken(user);
//     res.status(201).json({ user, token });
//   } catch (err) {
//     next(err);
//   }
// };


// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check password
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Award login credits - handle this after sending response
//     const credits = await awardLoginCredits(user._id);

//     // Cache user data in Redis after successful login
//     await ensureConnection();
//     await redisClient.set(`user:${user._id}`, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour

//     // Get updated user data without password
//     const updatedUser = await User.findById(user._id).select('-password');

//     res.status(200).json({
//       user: updatedUser,
//       credits: {
//         totalCredits: credits.totalCredits,
//         loginPoints: credits.loginPoints,
//         interactionPoints: credits.interactionPoints,
//         profileCompletionPoints: credits.profileCompletionPoints
//       },
//       token: generateToken(user)
//     });
//   } catch (err) {
//     next(err);
//   }
// };


// // Logout user
// exports.logout = (req, res) => {
//   // Client-side handles the removal of token from storage (localStorage/sessionStorage)
//   // In the backend, you may clear any session data (if using sessions, not typically required with JWT)
//   res.status(200).json({ message: 'Successfully logged out' });
// };

// // Fetch current user (requires token)
// exports.fetchCurrentUser = async (req, res, next) => {
//   try {
//     const user = req.user; // This will be set by the auth middleware (jwt middleware)
//     if (!user) {
//       return res.status(401).json({ message: 'User not authenticated' });
//     }

//     // First check Redis for the user data
//     await ensureConnection();
//     const cachedUser = await redisClient.get(`user:${user._id}`);
    
//     if (cachedUser) {
//       // If user is in cache, return the cached data
//       return res.status(200).json({ user: JSON.parse(cachedUser) });
//     }

//     // If not found in Redis, fetch user data from MongoDB and cache it
//     const userData = await User.findById(user._id).select('-password');
    
//     if (userData) {
//       // Cache user data in Redis for future requests
//       await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(userData)); // Cache for 1 hour
//       return res.status(200).json({ user: userData });
//     }

//     // If user data is not found in DB, return an error
//     res.status(404).json({ message: 'User not found' });
//   } catch (err) {
//     next(err);
//   }
// };


const User = require('../models/User');
const { generateTokens } = require('../utils/tokenUtils');
const { awardLoginCredits } = require('../services/creditService');
const Credits = require('../models/Credits');
const { redisClient, ensureConnection } = require('../config/redisClient');

// Register new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password, 
      role,
      credits: 0
    });

    // Create initial credits document
    await Credits.create({
      userId: user._id,
      totalCredits: 0,
      loginPoints: 0,
      interactionPoints: 0,
      profileCompletionPoints: 0,
      action: 'REGISTRATION'
    });

    const token = generateTokens(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password match
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Award login credits after successful login
    const credits = await awardLoginCredits(user._id);

    // Cache user data in Redis after successful login
    await ensureConnection();
    await redisClient.set(`user:${user._id}`, JSON.stringify(user), 'EX', 3600); // Cache for 1 hour

    // Get updated user data without password
    const updatedUser = await User.findById(user._id).select('-password');

    // Send response with user data, credits, and access token
    res.status(200).json({
      user: updatedUser,
      credits: {
        totalCredits: credits.totalCredits,
        loginPoints: credits.loginPoints,
        interactionPoints: credits.interactionPoints,
        profileCompletionPoints: credits.profileCompletionPoints
      },
      token: generateTokens(user) // Access token
    });
  } catch (err) {
    next(err);
  }
};

// Logout User
exports.logout = (req, res) => {
  // Client-side handles removal of token from storage (localStorage/sessionStorage)
  // In the backend, typically not needed for JWT but clearing any session data if required
  res.status(200).json({ message: 'Successfully logged out' });
};

// Fetch current user (requires token)
exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const user = req.user; // This will be set by the auth middleware (jwt middleware)
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // First, check Redis for the user data
    await ensureConnection();
    const cachedUser = await redisClient.get(`user:${user._id}`);
    
    if (cachedUser) {
      // If user data is cached, return it
      return res.status(200).json({ user: JSON.parse(cachedUser) });
    }

    // If not found in Redis, fetch user data from MongoDB and cache it
    const userData = await User.findById(user._id).select('-password');
    
    if (userData) {
      // Cache user data in Redis for future requests
      await redisClient.setEx(`user:${user._id}`, 3600, JSON.stringify(userData)); // Cache for 1 hour
      return res.status(200).json({ user: userData });
    }

    // If user data is not found in DB, return an error
    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    next(err);
  }
};
