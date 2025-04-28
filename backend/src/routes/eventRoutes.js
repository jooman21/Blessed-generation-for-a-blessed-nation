const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /api/events - Get all events (public)
router.get('/', eventController.getAllEvents);

// GET /api/events/:id - Get a single event by ID (public)
router.get('/:id', eventController.getEventById);

// POST /api/events - Create a new event (admin only)
router.post('/', authenticate, authorize(['admin']), eventController.createEvent);

// PUT /api/events/:id - Update an event (admin only)
router.put('/:id', authenticate, authorize(['admin']), eventController.updateEvent);

// DELETE /api/events/:id - Delete an event (admin only)
router.delete('/:id', authenticate, authorize(['admin']), eventController.deleteEvent);

// GET /api/events/category/:category - Get events by category
router.get('/category/:category', eventController.getEventsByCategory);

// GET /api/events/date/:startDate/:endDate - Get events by date range
router.get('/date/:startDate/:endDate', eventController.getEventsByDateRange);

// POST /api/events/:id/register - Register for an event (requires authentication)
router.post('/:id/register', authenticate, eventController.registerForEvent);

module.exports = router;
