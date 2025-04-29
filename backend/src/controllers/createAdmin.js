const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use." });
    }

    // Create new user (password hashing is handled by the model hook)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || "admin", // Default to donor if not provided
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Omit password from the response
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password;

    res.status(201).json({ 
      success: true, 
      message: "Admin registered successfully.", 
      token, 
      user: userResponse 
    });

  } catch (error) {
    next(error);
  }
};

// Login a user
exports.Adminlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Omit password from the response
    const userResponse = { ...user.toJSON() };
    delete userResponse.password;

    res.status(200).json({ 
      success: true, 
      message: "Login successful.", 
      token, 
      user: userResponse 
    });

  } catch (error) {
    next(error);
  }
};

// Get current user information (requires authentication middleware)
exports.getMe = async (req, res, next) => {
  try {
    // The authenticate middleware should have attached userId to req
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ["password"] } // Exclude password from the result
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    next(error);
  }
};

// Logout a user (JWT is stateless, so logout is typically handled client-side by removing the token)
// This endpoint can be used for blacklisting tokens if needed, but is often just a confirmation.
exports.logout = (req, res, next) => {
  // In a stateless JWT setup, there's nothing to do on the server for logout.
  // The client should discard the token.
  // If using refresh tokens or a token blacklist, implement that logic here.
  res.status(200).json({ success: true, message: "Logout successful (client should discard token)." });
};

