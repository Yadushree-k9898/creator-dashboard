const User = require('../models/User');
const Credits = require('../models/Credits');
const ActivityLog = require('../models/ActivityLog');


// Get all users for admin to view (with pagination)
exports.getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    
    res.json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific user by ID for admin to view
exports.getUserById = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role (Promote a user to admin)
exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  // Ensure the role is either 'Admin' or 'User'
  if (role !== 'Admin' && role !== 'User') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure the user is not changing their own role to 'Admin' (if that's a use case you want to prevent)
    if (userId === req.user.id && role === 'Admin') {
      return res.status(403).json({ message: 'You cannot promote yourself to Admin' });
    }

    user.role = role;
    await user.save();

    res.json({ message: `User role updated to ${role}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user credits (admin updates credits)
exports.updateUserCredits = async (req, res) => {
  const { userId, credits } = req.body;

  // Ensure credits is a valid number
  if (isNaN(credits)) {
    return res.status(400).json({ message: 'Credits must be a valid number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.credits = credits;
    await user.save();

    res.json({ message: `User credits updated to ${credits}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalCreators = await User.countDocuments({ role: 'user' });

    const platformCredits = await Credits.aggregate([
      {
        $group: {
          _id: null,
          totalCredits: { $sum: "$total" }
        }
      }
    ]);

    const topUsers = await User.find({ role: 'user' })
      .sort({ credits: -1 })
      .limit(5)
      .select('name email credits');

    const recentActivities = await ActivityLog.find()
      .sort('-createdAt')
      .limit(10)
      .select('user action details createdAt')
      .populate('user', 'name email');

    res.status(200).json({
      stats: {
        totalUsers,
        totalAdmins,
        totalCreators,
        totalPlatformCredits: platformCredits[0]?.totalCredits || 0,
      },
      topUsers,
      recentActivities,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard', error.message);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
