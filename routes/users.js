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

// Protected routes (Future implementation)
router.get('/', getAllProfiles);
router.get('/:id', checkProfileOwnership, getProfile);
router.put('/:id', checkProfileOwnership, updateProfile);

module.exports = router;