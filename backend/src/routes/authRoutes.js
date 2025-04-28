const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/register - Register a new user
router.post('/register', authController.register);

// POST /api/auth/login - Login a user
router.post('/login', authController.login);

// GET /api/auth/me - Get current user info (protected route)
router.get('/me', authController.getMe);

// POST /api/auth/logout - Logout a user
router.post('/logout', authController.logout);

module.exports = router;
