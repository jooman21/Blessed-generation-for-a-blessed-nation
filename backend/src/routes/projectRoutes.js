const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /api/projects - Get all projects (public)
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get a single project by ID (public)
router.get('/:id', projectController.getProjectById);

// POST /api/projects - Create a new project (admin only)
router.post('/', authenticate, authorize(['admin']), projectController.createProject);

// PUT /api/projects/:id - Update a project (admin only)
router.put('/:id', authenticate, authorize(['admin']), projectController.updateProject);

// DELETE /api/projects/:id - Delete a project (admin only)
router.delete('/:id', authenticate, authorize(['admin']), projectController.deleteProject);

// GET /api/projects/category/:category - Get projects by category
router.get('/category/:category', projectController.getProjectsByCategory);

// GET /api/projects/location/:location - Get projects by location
router.get('/location/:location', projectController.getProjectsByLocation);

// GET /api/projects/status/:status - Get projects by status
router.get('/status/:status', projectController.getProjectsByStatus);

module.exports = router;
