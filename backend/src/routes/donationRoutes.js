const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// POST /api/donations - Create a new donation (requires authentication)
// Payment gateway integration will happen here or in the controller
router.post("/", authenticate, donationController.createDonation);

// GET /api/donations/me - Get donation history for the logged-in user (requires authentication)
router.get("/me", authenticate, donationController.getMyDonations);

// GET /api/donations/project/:projectId - Get donations for a specific project (admin?)
router.get("/project/:projectId", authenticate, authorize(["admin"]), donationController.getDonationsByProject);

// GET /api/donations/stats - Get overall donation statistics (admin? public?)
router.get("/stats", donationController.getDonationStats); // Decide on protection later

// GET /api/donations/:id - Get a specific donation by ID (admin or owner)
router.get("/:id", authenticate, donationController.getDonationById);

// PUT /api/donations/:id/status - Update donation status (e.g., after payment confirmation, admin only?)
router.put("/:id/status", authenticate, authorize(["admin"]), donationController.updateDonationStatus);

module.exports = router;
