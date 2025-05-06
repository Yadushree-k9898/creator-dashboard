const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserCredits,
  getAdminDashboard
} = require('../controllers/adminController');


router.get('/users', protect, allowRoles('admin'), getAllUsers);  
router.get('/users/:userId', protect, allowRoles('admin'), getUserById);
router.put('/users/role', protect, allowRoles('admin'), updateUserRole); 
router.put('/users/credits', protect, allowRoles('admin'), updateUserCredits);  
router.get('/dashboard', allowRoles('admin'), getAdminDashboard);

module.exports = router;
