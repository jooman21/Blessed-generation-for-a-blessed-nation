const db = require("../models");
const FAQ = db.FAQ;
const { Op } = require("sequelize");

// Get all active FAQs, optionally filtered by category
exports.getAllFAQs = async (req, res, next) => {
  try {
    const { category } = req.query;
    const whereClause = { isActive: true };

    if (category) whereClause.category = category;

    const faqs = await FAQ.findAll({
      where: whereClause,
      order: [["category", "ASC"], ["displayOrder", "ASC"], ["createdAt", "ASC"]], // Order by category, display order, then creation
    });

    res.status(200).json({ success: true, faqs });
  } catch (error) {
    next(error);
  }
};

// Get a single active FAQ by ID
exports.getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findOne({
      where: { id: req.params.id, isActive: true },
    });

    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found or not active." });
    }

    res.status(200).json({ success: true, faq });
  } catch (error) {
    next(error);
  }
};

// Get active FAQs by category
exports.getFAQsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const faqs = await FAQ.findAll({
      where: { category, isActive: true },
      order: [["displayOrder", "ASC"], ["createdAt", "ASC"]],
    });

    res.status(200).json({ success: true, faqs });
  } catch (error) {
    next(error);
  }
};

// Create a new FAQ (Admin only)
exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, displayOrder, isActive } = req.body;

    // Basic validation
    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Question and answer are required." });
    }

    const newFAQ = await FAQ.create({
      question,
      answer,
      category,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, message: "FAQ created successfully.", faq: newFAQ });
  } catch (error) {
    next(error);
  }
};

// Update a FAQ (Admin only)
exports.updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }

    // Update FAQ fields
    await faq.update(req.body);

    res.status(200).json({ success: true, message: "FAQ updated successfully.", faq });
  } catch (error) {
    next(error);
  }
};

// Delete a FAQ (Admin only)
exports.deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByPk(req.params.id);

    if (!faq) {
      return res.status(404).json({ success: false, message: "FAQ not found." });
    }

    await faq.destroy();

    res.status(200).json({ success: true, message: "FAQ deleted successfully." });
  } catch (error) {
    next(error);
  }
};

