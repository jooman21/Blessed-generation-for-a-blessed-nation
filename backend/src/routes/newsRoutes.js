const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /api/news - Get all news articles (public)
router.get('/', newsController.getAllNews);

// GET /api/news/:id - Get a single news article by ID (public)
router.get('/:id', newsController.getNewsById);

// POST /api/news - Create a new news article (admin only)
router.post('/', authenticate, authorize(['admin']), newsController.createNews);

// PUT /api/news/:id - Update a news article (admin only)
router.put('/:id', authenticate, authorize(['admin']), newsController.updateNews);

// DELETE /api/news/:id - Delete a news article (admin only)
router.delete('/:id', authenticate, authorize(['admin']), newsController.deleteNews);

module.exports = router;
