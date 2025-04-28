const User = require('../models/User');
const Credits = require('../models/Credits');
const ActivityLog = require('../models/ActivityLog');
const SavedPost = require('../models/SavedPost');


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
    console.log('Fetching admin dashboard data');
    
    // User statistics
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'Admin' });
    const totalCreators = await User.countDocuments({ role: 'User' });
    
    // Get users registered in the last 7 days
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const newUsersLastWeek = await User.countDocuments({
      createdAt: { $gte: lastWeekDate }
    });

    // Get users registered in the last 30 days (monthly growth)
    const lastMonthDate = new Date();
    lastMonthDate.setDate(lastMonthDate.getDate() - 30);
    const newUsersLastMonth = await User.countDocuments({
      createdAt: { $gte: lastMonthDate }
    });
    
    // Monthly growth rate
    const monthlyGrowthRate = totalUsers > 0 ? (newUsersLastMonth / totalUsers) * 100 : 0;

    // Credit statistics - using aggregation to handle multiple credit records per user
    const platformCredits = await Credits.aggregate([
      {
        $group: {
          _id: null,
          totalCredits: { $sum: "$totalCredits" },
          totalLoginPoints: { $sum: "$loginPoints" },
          totalProfilePoints: { $sum: "$profileCompletionPoints" },
          totalInteractionPoints: { $sum: "$interactionPoints" }
        }
      }
    ]);

    // User engagement metrics
    const usersWithCompletedProfiles = await User.countDocuments({ profileCompleted: true });
    const profileCompletionRate = totalUsers > 0 ? (usersWithCompletedProfiles / totalUsers) * 100 : 0;
    
    // Get users who logged in in the last 7 days
    const activeUsersLastWeek = await User.countDocuments({
      lastLogin: { $gte: lastWeekDate }
    });
    const activeUserRate = totalUsers > 0 ? (activeUsersLastWeek / totalUsers) * 100 : 0;

    // Top users by credits
    const topUsersByCredits = await User.find()
      .sort({ credits: -1 })
      .limit(10)
      .select('name email role credits lastLogin profileCompleted');

    // Feed interaction statistics
    const totalSavedPosts = await SavedPost.countDocuments();
    const totalReportedPosts = await SavedPost.countDocuments({ reported: true });
    const totalSharedPosts = await SavedPost.countDocuments({ shared: true });
    
    // Calculate engagement rates
    const reportRate = totalSavedPosts > 0 ? ((totalReportedPosts / totalSavedPosts) * 100).toFixed(2) + '%' : '0%';
    const shareRate = totalSavedPosts > 0 ? ((totalSharedPosts / totalSavedPosts) * 100).toFixed(2) + '%' : '0%';
    
    // Get post sources distribution
    const postSourceDistribution = await SavedPost.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get post interaction trends by day (last 7 days)
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      last7Days.push(date);
    }
    
    // Get daily post interactions
    const dailyInteractions = [];
    for (let i = 0; i < 6; i++) {
      const startDate = last7Days[i+1];
      const endDate = last7Days[i];
      
      const savedCount = await SavedPost.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate }
      });
      
      const reportedCount = await SavedPost.countDocuments({
        reported: true,
        createdAt: { $gte: startDate, $lt: endDate }
      });
      
      const sharedCount = await SavedPost.countDocuments({
        shared: true,
        createdAt: { $gte: startDate, $lt: endDate }
      });
      
      dailyInteractions.push({
        date: startDate.toISOString().split('T')[0],
        saved: savedCount,
        reported: reportedCount,
        shared: sharedCount,
        total: savedCount + reportedCount + sharedCount
      });
    }

    // Recent user activities with better formatting
    const recentActivities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'name email role');
    
    // Format activities for better display
    const formattedActivities = recentActivities.map(activity => {
      let actionDisplay = '';
      switch(activity.action) {
        case 'LOGIN':
          actionDisplay = 'Logged in';
          break;
        case 'PROFILE_COMPLETION':
          actionDisplay = 'Completed profile';
          break;
        case 'SAVED_POST':
          actionDisplay = 'Saved a post';
          break;
        case 'SHARED_POST':
          actionDisplay = 'Shared a post';
          break;
        case 'REPORTED_POST':
          actionDisplay = 'Reported a post';
          break;
        default:
          actionDisplay = activity.action;
      }
      
      return {
        id: activity._id,
        user: activity.user ? {
          id: activity.user._id,
          name: activity.user.name,
          email: activity.user.email,
          role: activity.user.role
        } : { name: 'Unknown User' },
        action: actionDisplay,
        details: activity.details || 'No details available',
        createdAt: activity.createdAt
      };
    });

    // Credit distribution by action type
    const creditsByActionType = await Credits.aggregate([
      {
        $group: {
          _id: "$action",
          totalPoints: { $sum: "$totalCredits" },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalPoints: -1 } }
    ]);
    
    // Format credit distribution for better display
    const formattedCreditsByAction = creditsByActionType.map(item => {
      let actionDisplay = '';
      switch(item._id) {
        case 'LOGIN':
          actionDisplay = 'Daily Login';
          break;
        case 'PROFILE_COMPLETION':
          actionDisplay = 'Profile Completion';
          break;
        case 'POST_SAVE':
          actionDisplay = 'Saving Posts';
          break;
        case 'POST_SHARE':
          actionDisplay = 'Sharing Posts';
          break;
        case 'POST_REPORT':
          actionDisplay = 'Reporting Posts';
          break;
        default:
          actionDisplay = item._id;
      }
      
      return {
        action: actionDisplay,
        totalPoints: item.totalPoints,
        count: item.count,
        averagePoints: (item.totalPoints / item.count).toFixed(1)
      };
    });

    // Return the enhanced dashboard data
    res.status(200).json({
      userStats: {
        totalUsers,
        totalAdmins,
        totalCreators,
        newUsersLastWeek,
        newUsersLastMonth,
        monthlyGrowthRate: monthlyGrowthRate.toFixed(2) + '%',
        usersWithCompletedProfiles,
        profileCompletionRate: profileCompletionRate.toFixed(2) + '%',
        activeUsersLastWeek,
        activeUserRate: activeUserRate.toFixed(2) + '%'
      },
      creditStats: {
        totalPlatformCredits: platformCredits[0]?.totalCredits || 0,
        totalLoginPoints: platformCredits[0]?.totalLoginPoints || 0,
        totalProfilePoints: platformCredits[0]?.totalProfilePoints || 0,
        totalInteractionPoints: platformCredits[0]?.totalInteractionPoints || 0,
        creditsByActionType: formattedCreditsByAction
      },
      feedStats: {
        totalSavedPosts,
        totalReportedPosts,
        totalSharedPosts,
        reportRate,
        shareRate,
        postSourceDistribution,
        dailyInteractions
      },
      topUsers: topUsersByCredits.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        credits: user.credits,
        lastLogin: user.lastLogin,
        profileCompleted: user.profileCompleted ? 'Complete' : 'Incomplete'
      })),
      recentActivities: formattedActivities,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({ message: 'Error fetching admin dashboard data' });
  }
};
