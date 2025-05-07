// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const { allowRoles } = require('../middleware/roleMiddleware');
// const {
//   getAllUsers,
//   getUserById,
//   updateUserRole,
//   updateUserCredits,
//   getAdminDashboard
// } = require('../controllers/adminController');


// router.get('/users', protect, allowRoles('admin'), getAllUsers);  
// router.get('/users/:userId', protect, allowRoles('admin'), getUserById);
// router.put('/users/role', protect, allowRoles('admin'), updateUserRole); 
// router.put('/users/credits', protect, allowRoles('admin'), updateUserCredits);  
// router.get('/dashboard', allowRoles('admin'), getAdminDashboard);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { protect }    = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserCredits,
  getAdminDashboard,
  getActivityLogs
} = require('../controllers/adminController');

// All admin routes need a valid JWT first, then an admin role
router.get(
  '/users',
  protect,                // verify JWT → sets req.user
  allowRoles('admin'),    // check req.user.role === 'admin'
  getAllUsers
);

router.get(
  '/users/:userId',
  protect,
  allowRoles('admin'),
  getUserById
);

router.put(
  '/users/role',
  protect,
  allowRoles('admin'),
  updateUserRole
);

router.put(
  '/users/credits',
  protect,
  allowRoles('admin'),
  updateUserCredits
);

router.get(
  '/dashboard',
  protect,               
  allowRoles('admin'),
  getAdminDashboard
);

router.get(
  '/activity-logs',
  protect,
  allowRoles('admin'),
  getActivityLogs
);

module.exports = router;
