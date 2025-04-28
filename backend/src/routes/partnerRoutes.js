const express = require("express");
const router = express.Router();
const partnerController = require("../controllers/partnerController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// GET /api/partners - Get all active partners (public)
router.get("/", partnerController.getAllPartners);

// GET /api/partners/:id - Get a single partner by ID (public)
router.get("/:id", partnerController.getPartnerById);

// POST /api/partners - Create a new partner (admin only)
router.post("/", authenticate, authorize(["admin"]), partnerController.createPartner);

// PUT /api/partners/:id - Update a partner (admin only)
router.put("/:id", authenticate, authorize(["admin"]), partnerController.updatePartner);

// DELETE /api/partners/:id - Delete a partner (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), partnerController.deletePartner);

module.exports = router;
