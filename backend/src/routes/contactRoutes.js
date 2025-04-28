const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// POST /api/contact - Submit a contact form (public)
router.post("/", contactController.submitContactForm);

// --- Admin Routes ---

// GET /api/contact - Get all contact submissions (admin only)
router.get("/", authenticate, authorize(["admin"]), contactController.getAllSubmissions);

// GET /api/contact/:id - Get a single submission by ID (admin only)
router.get("/:id", authenticate, authorize(["admin"]), contactController.getSubmissionById);

// PUT /api/contact/:id - Update submission status or add notes (admin only)
router.put("/:id", authenticate, authorize(["admin"]), contactController.updateSubmission);

// DELETE /api/contact/:id - Delete a submission (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), contactController.deleteSubmission);

module.exports = router;
