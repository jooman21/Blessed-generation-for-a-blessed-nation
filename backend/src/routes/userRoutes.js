const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// GET /api/users/me - Get current user profile (already in authRoutes, but can be here too)
router.get("/me", authenticate, userController.getCurrentUserProfile);

// PUT /api/users/me - Update current user profile
router.put("/me", authenticate, userController.updateCurrentUserProfile);

// --- Admin Routes ---

// GET /api/users - Get all users (admin only)
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);

// GET /api/users/:id - Get a specific user by ID (admin only)
router.get("/:id", authenticate, authorize(["admin"]), userController.getUserById);

// PUT /api/users/:id - Update a specific user (admin only)
router.put("/:id", authenticate, authorize(["admin"]), userController.updateUserById);

// DELETE /api/users/:id - Delete a specific user (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), userController.deleteUserById);

module.exports = router;
