const db = require("../models");
const Volunteer = db.Volunteer;
const { Op } = require("sequelize");

// Get all volunteer opportunities with filtering and pagination
exports.getAllOpportunities = async (req, res, next) => {
  try {
    const { type, location, commitment, page = 1, limit = 10 } = req.query;
    const whereClause = { isPublished: true, status: "open" }; // Only show open, published opportunities

    if (type) whereClause.type = type;
    if (location) whereClause.location = location;
    if (commitment) whereClause.timeCommitment = commitment;

    const offset = (page - 1) * limit;

    const { count, rows } = await Volunteer.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Order by creation date, newest first
    });

    res.status(200).json({
      success: true,
      totalOpportunities: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      opportunities: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single volunteer opportunity by ID
exports.getOpportunityById = async (req, res, next) => {
  try {
    const opportunity = await Volunteer.findByPk(req.params.id);

    if (!opportunity || !opportunity.isPublished) {
      return res.status(404).json({ success: false, message: "Volunteer opportunity not found or not published." });
    }

    res.status(200).json({ success: true, opportunity });
  } catch (error) {
    next(error);
  }
};

// Create a new volunteer opportunity (Admin only)
exports.createOpportunity = async (req, res, next) => {
  try {
    const { 
      title, description, type, location, timeCommitment, 
      startDate, endDate, requiredSkills, status, maxVolunteers, isPublished 
    } = req.body;

    // Basic validation
    if (!title || !description || !type || !location || !timeCommitment) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newOpportunity = await Volunteer.create({
      title,
      description,
      type,
      location,
      timeCommitment,
      startDate,
      endDate,
      requiredSkills,
      status: status || "open",
      maxVolunteers,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, message: "Volunteer opportunity created successfully.", opportunity: newOpportunity });
  } catch (error) {
    next(error);
  }
};

// Update a volunteer opportunity (Admin only)
exports.updateOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Volunteer.findByPk(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Volunteer opportunity not found." });
    }

    // Update opportunity fields
    await opportunity.update(req.body);

    res.status(200).json({ success: true, message: "Volunteer opportunity updated successfully.", opportunity });
  } catch (error) {
    next(error);
  }
};

// Delete a volunteer opportunity (Admin only)
exports.deleteOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Volunteer.findByPk(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: "Volunteer opportunity not found." });
    }

    await opportunity.destroy();

    res.status(200).json({ success: true, message: "Volunteer opportunity deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// --- Filtering Functions (already covered by getAllOpportunities query params) ---

// Get opportunities by type
exports.getOpportunitiesByType = async (req, res, next) => {
  try {
    const opportunities = await Volunteer.findAll({ 
      where: { type: req.params.type, isPublished: true, status: "open" },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};

// Get opportunities by location
exports.getOpportunitiesByLocation = async (req, res, next) => {
  try {
    const opportunities = await Volunteer.findAll({ 
      where: { location: req.params.location, isPublished: true, status: "open" },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};

// Get opportunities by time commitment
exports.getOpportunitiesByCommitment = async (req, res, next) => {
  try {
    const opportunities = await Volunteer.findAll({ 
      where: { timeCommitment: req.params.commitment, isPublished: true, status: "open" },
      order: [["createdAt", "DESC"]]
    });
    res.status(200).json({ success: true, opportunities });
  } catch (error) {
    next(error);
  }
};

// Apply for a volunteer opportunity (requires authentication)
// Note: This is a placeholder. In a real implementation, you would create a join table
// between users and volunteer opportunities to track applications.
exports.applyForOpportunity = async (req, res, next) => {
  try {
    const opportunity = await Volunteer.findByPk(req.params.id);

    if (!opportunity || !opportunity.isPublished || opportunity.status !== "open") {
      return res.status(404).json({ success: false, message: "Volunteer opportunity not found, not published, or not open for applications." });
    }

    // Check if opportunity is full (if maxVolunteers is set)
    if (opportunity.maxVolunteers && opportunity.currentVolunteers >= opportunity.maxVolunteers) {
      return res.status(400).json({ success: false, message: "This volunteer opportunity is currently full." });
    }

    // In a real implementation, you would:
    // 1. Check if user has already applied
    // 2. Create a record in a UserVolunteerApplications join table
    // 3. Possibly send confirmation email
    // 4. Increment opportunity.currentVolunteers and save

    res.status(200).json({ 
      success: true, 
      message: "Application submitted successfully. This is a placeholder - actual application logic would be implemented in production.",
      userId: req.userId,
      opportunityId: opportunity.id
    });
  } catch (error) {
    next(error);
  }
};
