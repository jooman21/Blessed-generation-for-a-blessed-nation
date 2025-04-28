const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /api/stories - Get all stories and testimonials (public)
router.get('/', storyController.getAllStories);

// GET /api/stories/:id - Get a single story by ID (public)
router.get('/:id', storyController.getStoryById);

// POST /api/stories - Submit a new story (requires authentication)
router.post('/', authenticate, storyController.submitStory);

// PUT /api/stories/:id - Update a story (admin only or original submitter)
router.put('/:id', authenticate, storyController.updateStory);

// DELETE /api/stories/:id - Delete a story (admin only)
router.delete('/:id', authenticate, authorize(['admin']), storyController.deleteStory);

// PUT /api/stories/:id/publish - Publish/unpublish a story (admin only)
router.put('/:id/publish', authenticate, authorize(['admin']), storyController.togglePublishStatus);

// GET /api/stories/type/:type - Get stories by type (success_story or testimonial)
router.get('/type/:type', storyController.getStoriesByType);

module.exports = router;
