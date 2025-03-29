const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateProfile,
  getAllProfiles
} = require('../controllers/users');
const { protect, checkProfileOwnership } = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', protect, getAllProfiles);
router.get('/:id', protect, checkProfileOwnership, getProfile);
router.put('/:id', protect, checkProfileOwnership, updateProfile);

module.exports = router;