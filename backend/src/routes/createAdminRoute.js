const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const createAdminController = require('../controllers/createAdminController');

// POST /api/auth/createAdmin - Register a new admin
router.post('/createAdmin', createAdminController.createAdmin);

// POST /api/auth/login - Login an admin
router.post('/Adminlogin', createAdminController.Adminlogin);

// GET /api/auth/me - Get current admin info (protected route)
router.get('/getAdmin',authenticate, createAdminController.getAdmin);

// POST /api/auth/logout - Logout an admin
router.post('/logout', createAdminController.logout);

module.exports = router;