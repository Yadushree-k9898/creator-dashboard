const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');
const { awardDailyLoginBonus } = require('../utils/creditUtils');

// Register new user
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ name, email, password, role });

    // Generate a token for the user
    const token = generateToken(user);

    // Send the response with user and token
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

// Login existing user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Award daily login credits (once per day)
    await awardDailyLoginBonus(user._id);

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate a token for the user
    const token = generateToken(user);

    // Send the response with user and token
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};
