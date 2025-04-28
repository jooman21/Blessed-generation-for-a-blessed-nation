const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// GET /api/volunteer - Get all volunteer opportunities (public)
router.get('/', volunteerController.getAllOpportunities);

// GET /api/volunteer/:id - Get a single volunteer opportunity by ID (public)
router.get('/:id', volunteerController.getOpportunityById);

// POST /api/volunteer - Create a new volunteer opportunity (admin only)
router.post('/', authenticate, authorize(['admin']), volunteerController.createOpportunity);

// PUT /api/volunteer/:id - Update a volunteer opportunity (admin only)
router.put('/:id', authenticate, authorize(['admin']), volunteerController.updateOpportunity);

// DELETE /api/volunteer/:id - Delete a volunteer opportunity (admin only)
router.delete('/:id', authenticate, authorize(['admin']), volunteerController.deleteOpportunity);

// GET /api/volunteer/type/:type - Get opportunities by type
router.get('/type/:type', volunteerController.getOpportunitiesByType);

// GET /api/volunteer/location/:location - Get opportunities by location
router.get('/location/:location', volunteerController.getOpportunitiesByLocation);

// GET /api/volunteer/commitment/:commitment - Get opportunities by time commitment
router.get('/commitment/:commitment', volunteerController.getOpportunitiesByCommitment);

// POST /api/volunteer/:id/apply - Apply for a volunteer opportunity (requires authentication)
router.post('/:id/apply', authenticate, volunteerController.applyForOpportunity);

module.exports = router;
