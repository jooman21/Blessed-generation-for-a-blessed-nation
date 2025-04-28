const db = require("../models");
const TeamMember = db.TeamMember;

// Get all active team members
exports.getAllTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await TeamMember.findAll({
      where: { isActive: true },
      order: [["displayOrder", "ASC"], ["createdAt", "ASC"]], // Order by display order, then creation date
    });

    res.status(200).json({ success: true, teamMembers });
  } catch (error) {
    next(error);
  }
};

// Get a single team member by ID
exports.getTeamMemberById = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);

    if (!teamMember || !teamMember.isActive) {
      return res.status(404).json({ success: false, message: "Team member not found or not active." });
    }

    res.status(200).json({ success: true, teamMember });
  } catch (error) {
    next(error);
  }
};

// Create a new team member (Admin only)
exports.createTeamMember = async (req, res, next) => {
  try {
    const { name, position, bio, profileImage, email, socialLinks, displayOrder, isActive } = req.body;

    // Basic validation
    if (!name || !position) {
      return res.status(400).json({ success: false, message: "Name and position are required." });
    }

    const newMember = await TeamMember.create({
      name,
      position,
      bio,
      profileImage,
      email,
      socialLinks,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, message: "Team member created successfully.", teamMember: newMember });
  } catch (error) {
    next(error);
  }
};

// Update a team member (Admin only)
exports.updateTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found." });
    }

    // Update team member fields
    await teamMember.update(req.body);

    res.status(200).json({ success: true, message: "Team member updated successfully.", teamMember });
  } catch (error) {
    next(error);
  }
};

// Delete a team member (Admin only)
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ success: false, message: "Team member not found." });
    }

    await teamMember.destroy();

    res.status(200).json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    next(error);
  }
};

