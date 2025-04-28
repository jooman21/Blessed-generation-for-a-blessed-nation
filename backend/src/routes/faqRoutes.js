const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// GET /api/faqs - Get all active FAQs (public)
router.get("/", faqController.getAllFAQs);

// GET /api/faqs/:id - Get a single FAQ by ID (public)
router.get("/:id", faqController.getFAQById);

// GET /api/faqs/category/:category - Get FAQs by category (public)
router.get("/category/:category", faqController.getFAQsByCategory);

// POST /api/faqs - Create a new FAQ (admin only)
router.post("/", authenticate, authorize(["admin"]), faqController.createFAQ);

// PUT /api/faqs/:id - Update a FAQ (admin only)
router.put("/:id", authenticate, authorize(["admin"]), faqController.updateFAQ);

// DELETE /api/faqs/:id - Delete a FAQ (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), faqController.deleteFAQ);

module.exports = router;
