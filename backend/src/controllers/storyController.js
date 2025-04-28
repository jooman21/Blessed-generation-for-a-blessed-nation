const db = require("../models");
const Story = db.Story;
const User = db.User;
const { Op } = require("sequelize");

// Get all published stories and testimonials with pagination
exports.getAllStories = async (req, res, next) => {
  try {
    const { type, page = 1, limit = 9 } = req.query; // Default limit 9 for 3x3 grid
    const whereClause = { isPublished: true };

    if (type) whereClause.type = type;

    const offset = (page - 1) * limit;

    const { count, rows } = await Story.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["submissionDate", "DESC"]], // Order by submission date, newest first
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"], // Include basic user info if linked
        },
      ],
    });

    res.status(200).json({
      success: true,
      totalStories: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      stories: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single published story by ID
exports.getStoryById = async (req, res, next) => {
  try {
    const story = await Story.findOne({
      where: { id: req.params.id, isPublished: true },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found or not published." });
    }

    res.status(200).json({ success: true, story });
  } catch (error) {
    next(error);
  }
};

// Submit a new story (requires authentication)
exports.submitStory = async (req, res, next) => {
  try {
    const { title, content, type, authorName, authorRole, featuredImage, videoUrl } = req.body;
    const userId = req.userId; // From authentication middleware

    // Basic validation
    if (!title || !content || !type) {
      return res.status(400).json({ success: false, message: "Title, content, and type are required." });
    }

    const newStory = await Story.create({
      title,
      content,
      type,
      authorName, // Could be pre-filled if user is logged in
      authorRole, // Could be pre-filled if user is logged in
      userId, // Link to the logged-in user
      featuredImage,
      videoUrl,
      isPublished: false, // Requires admin approval
    });

    res.status(201).json({ success: true, message: "Story submitted successfully. It will be reviewed by an administrator.", story: newStory });
  } catch (error) {
    next(error);
  }
};

// Update a story (Admin only or original submitter - implement ownership check if needed)
exports.updateStory = async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found." });
    }

    // Add authorization check: only admin or original submitter can update
    // if (req.user.role !== 'admin' && story.userId !== req.userId) {
    //   return res.status(403).json({ success: false, message: "Not authorized to update this story." });
    // }

    // Update story fields
    await story.update(req.body);

    res.status(200).json({ success: true, message: "Story updated successfully.", story });
  } catch (error) {
    next(error);
  }
};

// Delete a story (Admin only)
exports.deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found." });
    }

    await story.destroy();

    res.status(200).json({ success: true, message: "Story deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Toggle publish status of a story (Admin only)
exports.togglePublishStatus = async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.params.id);

    if (!story) {
      return res.status(404).json({ success: false, message: "Story not found." });
    }

    story.isPublished = !story.isPublished;
    await story.save();

    const statusMessage = story.isPublished ? "published" : "unpublished";
    res.status(200).json({ success: true, message: `Story ${statusMessage} successfully.`, story });
  } catch (error) {
    next(error);
  }
};

// Get published stories by type
exports.getStoriesByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { page = 1, limit = 9 } = req.query;

    if (!["success_story", "testimonial"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid story type." });
    }

    const whereClause = { type, isPublished: true };
    const offset = (page - 1) * limit;

    const { count, rows } = await Story.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["submissionDate", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      totalStories: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      stories: rows,
    });
  } catch (error) {
    next(error);
  }
};
