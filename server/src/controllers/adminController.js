const Redis = require('ioredis');
const User = require('../models/User');
const Credits = require('../models/Credits');
const ActivityLog = require('../models/ActivityLog');
const SavedPost = require('../models/SavedPost');

// Initialize a single, connected ioredis client using your cloud REDIS_URL
const redis = new Redis(process.env.REDIS_URL, {
  tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
  retryStrategy(times) {
    console.warn(`🔁 Redis reconnect attempt #${times}`);
    return Math.min(times * 50, 2000);
  },
  reconnectOnError(err) {
    console.error('❌ Redis reconnecting due to error:', err);
    return true;
  }
});

redis.on('connect', () => console.log('✅ Redis connected (ioredis)'));
redis.on('error', (err) => console.error('❌ Redis error:', err));

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
    console.error('getAllUsers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific user by ID for admin to view
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('getUserById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user role (Promote a user to admin)
exports.updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (userId === req.user.id && role === 'admin') {
      return res.status(403).json({ message: 'You cannot promote yourself to Admin' });
    }

    user.role = role;
    await user.save();
    res.json({ message: `User role updated to ${role}` });
  } catch (err) {
    console.error('updateUserRole error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user credits (admin updates credits)
exports.updateUserCredits = async (req, res) => {
  const { userId, credits } = req.body;

  if (isNaN(credits)) {
    return res.status(400).json({ message: 'Credits must be a valid number' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.credits = credits;
    await user.save();
    res.json({ message: `User credits updated to ${credits}` });
  } catch (err) {
    console.error('updateUserCredits error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin dashboard data with caching
exports.getAdminDashboard = async (req, res) => {
  const cacheKey = 'admin_dashboard_data';

  try {
    // Try to read from Redis
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    console.log('Fetching admin dashboard data from DB');

    // User statistics
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalCreators = await User.countDocuments({ role: 'user' });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newUsersLastWeek = await User.countDocuments({ createdAt: { $gte: lastWeek } });

    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    const newUsersLastMonth = await User.countDocuments({ createdAt: { $gte: lastMonth } });

    const monthlyGrowthRate = totalUsers > 0 ? (newUsersLastMonth / totalUsers) * 100 : 0;

    // Credits aggregation
    const [platformCreditsAgg] = await Credits.aggregate([
      {
        $group: {
          _id: null,
          totalCredits: { $sum: '$totalCredits' },
          totalLoginPoints: { $sum: '$loginPoints' },
          totalProfilePoints: { $sum: '$profileCompletionPoints' },
          totalInteractionPoints: { $sum: '$interactionPoints' },
        },
      },
    ]);

    const usersWithCompletedProfiles = await User.countDocuments({ profileCompleted: true });
    const profileCompletionRate =
      totalUsers > 0 ? (usersWithCompletedProfiles / totalUsers) * 100 : 0;

    const activeUsersLastWeek = await User.countDocuments({ lastLogin: { $gte: lastWeek } });
    const activeUserRate = totalUsers > 0 ? (activeUsersLastWeek / totalUsers) * 100 : 0;

    const topUsersByCredits = await User.find()
      .sort({ credits: -1 })
      .limit(10)
      .select('name email role credits lastLogin profileCompleted');

    // Feed stats
    const totalSavedPosts = await SavedPost.countDocuments();
    const totalReportedPosts = await SavedPost.countDocuments({ reported: true });
    const totalSharedPosts = await SavedPost.countDocuments({ shared: true });

    const reportRate =
      totalSavedPosts > 0
        ? ((totalReportedPosts / totalSavedPosts) * 100).toFixed(2) + '%'
        : '0%';
    const shareRate =
      totalSavedPosts > 0
        ? ((totalSharedPosts / totalSavedPosts) * 100).toFixed(2) + '%'
        : '0%';

    const postSourceDistribution = await SavedPost.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Daily interactions
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      last7Days.push(d);
    }

    const dailyInteractions = [];
    for (let i = 0; i < 6; i++) {
      const start = last7Days[i + 1];
      const end = last7Days[i];
      const savedCount = await SavedPost.countDocuments({
        createdAt: { $gte: start, $lt: end },
      });
      const reportedCount = await SavedPost.countDocuments({
        reported: true,
        createdAt: { $gte: start, $lt: end },
      });
      const sharedCount = await SavedPost.countDocuments({
        shared: true,
        createdAt: { $gte: start, $lt: end },
      });
      dailyInteractions.push({
        date: start.toISOString().split('T')[0],
        saved: savedCount,
        reported: reportedCount,
        shared: sharedCount,
        total: savedCount + reportedCount + sharedCount,
      });
    }

    // Recent activities
    const recentActivitiesRaw = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('user', 'name email role');

    const recentActivities = recentActivitiesRaw.map((activity) => {
      let actionDisplay = '';
      switch (activity.action) {
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
        user: activity.user
          ? {
              id: activity.user._id,
              name: activity.user.name,
              email: activity.user.email,
              role: activity.user.role,
            }
          : { name: 'Unknown User' },
        action: actionDisplay,
        details: activity.details || 'No details available',
        createdAt: activity.createdAt,
      };
    });

    // Credits by action type
    const creditsByActionTypeRaw = await Credits.aggregate([
      {
        $group: {
          _id: '$action',
          totalPoints: { $sum: '$totalCredits' },
          count: { $sum: 1 },
        },
      },
      { $sort: { totalPoints: -1 } },
    ]);

    const creditsByActionType = creditsByActionTypeRaw.map((item) => {
      let actionDisplay = '';
      switch (item._id) {
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
        averagePoints: (item.totalPoints / item.count).toFixed(1),
      };
    });

    // Construct dashboard data
    const dashboardData = {
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
        activeUserRate: activeUserRate.toFixed(2) + '%',
      },
      creditStats: {
        totalPlatformCredits: platformCreditsAgg?.totalCredits || 0,
        totalLoginPoints: platformCreditsAgg?.totalLoginPoints || 0,
        totalProfilePoints: platformCreditsAgg?.totalProfilePoints || 0,
        totalInteractionPoints: platformCreditsAgg?.totalInteractionPoints || 0,
        creditsByActionType,
      },
      feedStats: {
        totalSavedPosts,
        totalReportedPosts,
        totalSharedPosts,
        reportRate,
        shareRate,
        postSourceDistribution,
        dailyInteractions,
      },
      recentActivities,
      topUsersByCredits,
    };

    // Cache for 5 minutes
    await redis.set(cacheKey, JSON.stringify(dashboardData), 'EX', 300);

    return res.json(dashboardData);
  } catch (err) {
    console.error('Error fetching admin dashboard data:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Get user activity logs with pagination and filtering
exports.getActivityLogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { action, userId } = req.query;

  const filter = {};
  if (action) filter.action = action;
  if (userId) filter.user = userId;

  try {
    // Query the logs with pagination and filtering
    const logs = await ActivityLog.find(filter)
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalLogs = await ActivityLog.countDocuments(filter);

    res.json({
      logs,
      totalLogs,
      totalPages: Math.ceil(totalLogs / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

