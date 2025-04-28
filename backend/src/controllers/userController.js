const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");

// Get current user profile
exports.getCurrentUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // From authentication middleware
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }, // Exclude password
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update current user profile
exports.updateCurrentUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Fields that can be updated by the user
    const { firstName, lastName, phone, address, profileImage } = req.body;
    const updateData = { firstName, lastName, phone, address, profileImage };

    // Remove undefined fields to avoid overwriting with null
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    await user.update(updateData);

    // Fetch updated user data without password
    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({ success: true, message: "Profile updated successfully.", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// --- Admin Functions ---

// Get all users (Admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const whereClause = {};

    if (role) whereClause.role = role;
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] }, // Exclude password from list
    });

    res.status(200).json({
      success: true,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      users: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific user by ID (Admin only)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// Update a specific user by ID (Admin only)
exports.updateUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Admin can update more fields, including role and isActive status
    const { firstName, lastName, email, role, phone, address, isActive } = req.body;
    const updateData = { firstName, lastName, email, role, phone, address, isActive };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    // Prevent password update through this route for security
    delete updateData.password;

    await user.update(updateData);

    // Fetch updated user data without password
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({ success: true, message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    // Handle potential unique constraint error for email
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }
    next(error);
  }
};

// Delete a specific user by ID (Admin only)
exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Consider soft delete (setting isActive to false) instead of hard delete
    // await user.update({ isActive: false });
    await user.destroy(); // Hard delete

    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
};

