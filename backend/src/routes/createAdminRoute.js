const express = require('express');
const router = express.Router();
const authController = require('../controllers/createAdmin');

// POST /api/auth/register - Register a new user
router.post('/createAdmin', createAdmin.createAdmin);

// POST /api/auth/login - Login a user
router.post('/Adminlogin', authController.login);

// GET /api/auth/me - Get current user info (protected route)
router.get('/me', authController.getMe);

// POST /api/auth/logout - Logout a user
router.post('/logout', authController.logout);

module.exports = router;