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


router.get('/users', protect, allowRoles('Admin'), getAllUsers);  
router.get('/users/:userId', protect, allowRoles('Admin'), getUserById);
router.put('/users/role', protect, allowRoles('Admin'), updateUserRole); 
router.put('/users/credits', protect, allowRoles('Admin'), updateUserCredits);  
router.get('/dashboard', protect, allowRoles('Admin'), getAdminDashboard);

module.exports = router;
