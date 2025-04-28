const db = require("../models");
const News = db.News;
const { Op } = require("sequelize");

// Get all news articles with pagination
exports.getAllNews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const whereClause = { isPublished: true }; // Only show published news by default

    const offset = (page - 1) * limit;

    const { count, rows } = await News.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["publishDate", "DESC"]], // Order by publish date, newest first
    });

    res.status(200).json({
      success: true,
      totalNews: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      news: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single news article by ID
exports.getNewsById = async (req, res, next) => {
  try {
    const newsArticle = await News.findByPk(req.params.id);

    if (!newsArticle || !newsArticle.isPublished) {
      return res.status(404).json({ success: false, message: "News article not found or not published." });
    }

    res.status(200).json({ success: true, newsArticle });
  } catch (error) {
    next(error);
  }
};

// Create a new news article (Admin only)
exports.createNews = async (req, res, next) => {
  try {
    const { title, content, author, publishDate, featuredImage, isPublished } = req.body;

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const newArticle = await News.create({
      title,
      content,
      author, // Consider linking to User model ID if authors are users
      publishDate: publishDate || new Date(),
      featuredImage,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, message: "News article created successfully.", newsArticle: newArticle });
  } catch (error) {
    next(error);
  }
};

// Update a news article (Admin only)
exports.updateNews = async (req, res, next) => {
  try {
    const newsArticle = await News.findByPk(req.params.id);

    if (!newsArticle) {
      return res.status(404).json({ success: false, message: "News article not found." });
    }

    // Update news article fields
    await newsArticle.update(req.body);

    res.status(200).json({ success: true, message: "News article updated successfully.", newsArticle });
  } catch (error) {
    next(error);
  }
};

// Delete a news article (Admin only)
exports.deleteNews = async (req, res, next) => {
  try {
    const newsArticle = await News.findByPk(req.params.id);

    if (!newsArticle) {
      return res.status(404).json({ success: false, message: "News article not found." });
    }

    await newsArticle.destroy();

    res.status(200).json({ success: true, message: "News article deleted successfully." });
  } catch (error) {
    next(error);
  }
};

