const redis = require('redis');
const User = require('../models/User');
const Credits = require('../models/Credits');
const ActivityLog = require('../models/ActivityLog');
const SavedPost = require('../models/SavedPost');

// Set up Redis client
const client = redis.createClient({ host: 'localhost', port: 6379 });

client.on('error', (err) => {
  console.log('Redis error: ', err);
});

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

  // if (role !== 'admin' && role !== 'user') {
  //   return res.status(400).json({ message: 'Invalid role' });
  // }
  

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userId === req.user.id && role === 'admin') {
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

// Get admin dashboard data with caching
exports.getAdminDashboard = async (req, res) => {
  const cacheKey = 'admin_dashboard_data';

  try {
    // Check if data exists in Redis cache
    client.get(cacheKey, async (err, cachedData) => {
      if (err) {
        console.error('Error fetching data from Redis:', err);
      }

      // If cached data exists, return it
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      } else {
        console.log('Fetching admin dashboard data from DB');

        // User statistics
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: 'admin' });
        const totalCreators = await User.countDocuments({ role: 'user' });
        
        const lastWeekDate = new Date();
        lastWeekDate.setDate(lastWeekDate.getDate() - 7);
        const newUsersLastWeek = await User.countDocuments({
          createdAt: { $gte: lastWeekDate }
        });

        const lastMonthDate = new Date();
        lastMonthDate.setDate(lastMonthDate.getDate() - 30);
        const newUsersLastMonth = await User.countDocuments({
          createdAt: { $gte: lastMonthDate }
        });
        
        const monthlyGrowthRate = totalUsers > 0 ? (newUsersLastMonth / totalUsers) * 100 : 0;

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

        const usersWithCompletedProfiles = await User.countDocuments({ profileCompleted: true });
        const profileCompletionRate = totalUsers > 0 ? (usersWithCompletedProfiles / totalUsers) * 100 : 0;
        
        const activeUsersLastWeek = await User.countDocuments({
          lastLogin: { $gte: lastWeekDate }
        });
        const activeUserRate = totalUsers > 0 ? (activeUsersLastWeek / totalUsers) * 100 : 0;

        const topUsersByCredits = await User.find()
          .sort({ credits: -1 })
          .limit(10)
          .select('name email role credits lastLogin profileCompleted');

        const totalSavedPosts = await SavedPost.countDocuments();
        const totalReportedPosts = await SavedPost.countDocuments({ reported: true });
        const totalSharedPosts = await SavedPost.countDocuments({ shared: true });
        
        const reportRate = totalSavedPosts > 0 ? ((totalReportedPosts / totalSavedPosts) * 100).toFixed(2) + '%' : '0%';
        const shareRate = totalSavedPosts > 0 ? ((totalSharedPosts / totalSavedPosts) * 100).toFixed(2) + '%' : '0%';

        const postSourceDistribution = await SavedPost.aggregate([
          {
            $group: {
              _id: "$source",
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } }
        ]);

        const last7Days = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          last7Days.push(date);
        }

        const dailyInteractions = [];
        for (let i = 0; i < 6; i++) {
          const startDate = last7Days[i + 1];
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

        const recentActivities = await ActivityLog.find()
          .sort({ createdAt: -1 })
          .limit(20)
          .populate('user', 'name email role');

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

        // Cache the response in Redis for 5 minutes (300 seconds)
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
          recentActivities,
          topUsersByCredits
        };

        // Save to Redis cache
        client.setex(cacheKey, 300, JSON.stringify(dashboardData));

        res.json(dashboardData);
      }
    });
  } catch (err) {
    console.error('Error fetching admin dashboard data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
