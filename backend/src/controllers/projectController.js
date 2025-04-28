const db = require("../models");
const Project = db.Project;
const { Op } = require("sequelize"); // For filtering

// Get all projects with filtering and pagination
exports.getAllProjects = async (req, res, next) => {
  try {
    const { category, location, status, page = 1, limit = 10 } = req.query;
    const whereClause = {};

    if (category) whereClause.category = category;
    if (location) whereClause.location = location;
    if (status) whereClause.status = status;
    whereClause.isPublished = true; // Only show published projects by default

    const offset = (page - 1) * limit;

    const { count, rows } = await Project.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["startDate", "DESC"]], // Example ordering
    });

    res.status(200).json({
      success: true,
      totalProjects: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      projects: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project || !project.isPublished) {
      return res.status(404).json({ success: false, message: "Project not found or not published." });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    next(error);
  }
};

// Create a new project (Admin only)
exports.createProject = async (req, res, next) => {
  try {
    const { 
      title, description, category, location, status, 
      startDate, endDate, fundingGoal, featuredImage, impactMetrics, isPublished 
    } = req.body;

    // Basic validation (more robust validation can be added)
    if (!title || !description || !category || !location || !startDate) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newProject = await Project.create({
      title,
      description,
      category,
      location,
      status,
      startDate,
      endDate,
      fundingGoal,
      featuredImage,
      impactMetrics,
      isPublished: isPublished !== undefined ? isPublished : true, // Default to published if not specified
    });

    res.status(201).json({ success: true, message: "Project created successfully.", project: newProject });
  } catch (error) {
    next(error);
  }
};

// Update a project (Admin only)
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    // Update project fields
    await project.update(req.body);

    res.status(200).json({ success: true, message: "Project updated successfully.", project });
  } catch (error) {
    next(error);
  }
};

// Delete a project (Admin only)
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    await project.destroy();

    res.status(200).json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// --- Filtering Functions (already covered by getAllProjects query params) ---
// These can be kept separate if more complex logic is needed per filter type

// Get projects by category
exports.getProjectsByCategory = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ 
      where: { category: req.params.category, isPublished: true },
      order: [["startDate", "DESC"]]
    });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    next(error);
  }
};

// Get projects by location
exports.getProjectsByLocation = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ 
      where: { location: req.params.location, isPublished: true },
      order: [["startDate", "DESC"]]
    });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    next(error);
  }
};

// Get projects by status
exports.getProjectsByStatus = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ 
      where: { status: req.params.status, isPublished: true },
      order: [["startDate", "DESC"]]
    });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    next(error);
  }
};

