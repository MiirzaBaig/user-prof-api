const User = require('../models/User');

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, address, bio, profilePicture } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create user
    const user = await User.create({
      name,
      email,
      password,
      address,
      bio,
      profilePicture
    });
    
    // Generate token
    const token = user.getSignedJwtToken();
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'User registration failed',
      error: err.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }
    
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = user.getSignedJwtToken();
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Login failed',
      error: err.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  public
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error retrieving profile',
      error: err.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  public
exports.updateProfile = async (req, res) => {
  try {
    // Remove password from update fields (password update should be separate)
    if (req.body.password) {
      delete req.body.password;
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error updating profile',
      error: err.message
    });
  }
};

// @desc    Get all profiles (for admin, could be limited in production)
// @route   GET /api/users
// @access  public
exports.getAllProfiles = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error retrieving profiles',
      error: err.message
    });
  }
};