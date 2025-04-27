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
