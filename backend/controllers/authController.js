const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'volt-secret-key';

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("SIGNUP REQUEST:", req.body);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required.'
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("HASHED PASSWORD:", hashedPassword);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || 'customer'
    });

    console.log("USER CREATED:", user);

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    // Response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    res.status(500).json({
      message: 'Failed to sign up.',
      error: error.message
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.'
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim()
    }).select('+password');

    console.log("USER FOUND:", user);

    // User not found
    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    console.log("ENTERED PASSWORD:", password);
    console.log("STORED HASH:", user.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid password'
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    // Response
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: 'Failed to login.',
      error: error.message
    });
  }
};

// ================= PROFILE =================
exports.getProfile = async (req, res) => {
  try {

    console.log("PROFILE USER:", req.user);

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    console.log("PROFILE ERROR:", error);

    res.status(500).json({
      message: 'Unable to fetch profile.',
      error: error.message
    });
  }
};
