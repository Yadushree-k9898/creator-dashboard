const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { awardLoginCredits } = require('../services/creditService');
const Credits = require('../models/Credits');

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

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

// Login existing user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Award login credits - handle this after sending response
    const credits = await awardLoginCredits(user._id);

    // Get updated user data
    const updatedUser = await User.findById(user._id).select('-password');

    res.status(200).json({
      user: updatedUser,
      credits: {
        totalCredits: credits.totalCredits,
        loginPoints: credits.loginPoints,
        interactionPoints: credits.interactionPoints,
        profileCompletionPoints: credits.profileCompletionPoints
      },
      token: generateToken(user)
    });
  } catch (err) {
    next(err);
  }
};

// Logout user
exports.logout = (req, res) => {
  // Client-side handles the removal of token from storage (localStorage/sessionStorage)
  // In the backend, you may clear any session data (if using sessions, not typically required with JWT)
  res.status(200).json({ message: 'Successfully logged out' });
};

// Fetch current user (requires token)
exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const user = req.user; // This will be set by the auth middleware (jwt middleware)
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Fetch user data and return
    const userData = await User.findById(user._id).select('-password');
    res.status(200).json({ user: userData });
  } catch (err) {
    next(err);
  }
};
