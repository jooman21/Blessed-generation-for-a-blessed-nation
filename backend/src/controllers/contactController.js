const db = require("../models");
const ContactSubmission = db.ContactSubmission;
const { Op } = require("sequelize");

// Submit a contact form (public)
exports.submitContactForm = async (req, res, next) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const newSubmission = await ContactSubmission.create({
      firstName,
      lastName,
      email,
      subject,
      message,
      status: "new",
      isRead: false,
    });

    res.status(201).json({ success: true, message: "Contact form submitted successfully. We'll get back to you soon.", submission: newSubmission });
  } catch (error) {
    next(error);
  }
};

// --- Admin Functions ---

// Get all contact submissions (Admin only)
exports.getAllSubmissions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, isRead, search } = req.query;
    const whereClause = {};

    if (status) whereClause.status = status;
    if (isRead !== undefined) whereClause.isRead = isRead === "true";
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { subject: { [Op.iLike]: `%${search}%` } },
        { message: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await ContactSubmission.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Newest first
    });

    res.status(200).json({
      success: true,
      totalSubmissions: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      submissions: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single submission by ID (Admin only)
exports.getSubmissionById = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found." });
    }

    // Mark as read if not already
    if (!submission.isRead) {
      submission.isRead = true;
      await submission.save();
    }

    res.status(200).json({ success: true, submission });
  } catch (error) {
    next(error);
  }
};

// Update submission status or add notes (Admin only)
exports.updateSubmission = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found." });
    }

    const { status, responseNotes, isRead } = req.body;
    const updateData = {};

    if (status) updateData.status = status;
    if (responseNotes !== undefined) updateData.responseNotes = responseNotes;
    if (isRead !== undefined) updateData.isRead = isRead;

    await submission.update(updateData);

    res.status(200).json({ success: true, message: "Submission updated successfully.", submission });
  } catch (error) {
    next(error);
  }
};

// Delete a submission (Admin only)
exports.deleteSubmission = async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(req.params.id);

    if (!submission) {
      return res.status(404).json({ success: false, message: "Submission not found." });
    }

    await submission.destroy();

    res.status(200).json({ success: true, message: "Submission deleted successfully." });
  } catch (error) {
    next(error);
  }
};
