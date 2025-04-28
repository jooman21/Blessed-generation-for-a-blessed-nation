const db = require("../models");
const Donation = db.Donation;
const Project = db.Project;
const User = db.User;
const { Op } = require("sequelize");

// Create a new donation
exports.createDonation = async (req, res, next) => {
  try {
    const { projectId, amount, donationType } = req.body;
    const userId = req.userId; // From authentication middleware

    // Basic validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Valid donation amount is required." });
    }

    // If projectId is provided, verify it exists
    if (projectId) {
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found." });
      }
    }

    // Create donation record
    const newDonation = await Donation.create({
      userId,
      projectId,
      amount,
      donationType: donationType || "one-time",
      status: "pending", // Will be updated after payment processing
    });

    // In a real implementation, you would:
    // 1. Integrate with a payment gateway (e.g., Stripe, PayPal)
    // 2. Create a payment intent/session
    // 3. Return payment information to the client for processing
    // 4. Handle webhooks to update donation status after payment

    res.status(201).json({
      success: true,
      message: "Donation record created. Proceed to payment.",
      donation: newDonation,
      // paymentInfo: { ... } // Payment gateway specific information would go here
    });
  } catch (error) {
    next(error);
  }
};

// Get donation history for the logged-in user
exports.getMyDonations = async (req, res, next) => {
  try {
    const userId = req.userId; // From authentication middleware

    const donations = await Donation.findAll({
      where: { userId },
      include: [
        {
          model: Project,
          attributes: ["id", "title"],
        },
      ],
      order: [["donationDate", "DESC"]],
    });

    res.status(200).json({ success: true, donations });
  } catch (error) {
    next(error);
  }
};

// Get donations for a specific project (admin)
exports.getDonationsByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Verify project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Donation.findAndCountAll({
      where: { projectId, status: "completed" }, // Only count completed donations
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["donationDate", "DESC"]],
    });

    res.status(200).json({
      success: true,
      totalDonations: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      donations: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get overall donation statistics
exports.getDonationStats = async (req, res, next) => {
  try {
    // Total amount raised (completed donations only)
    const totalRaised = await Donation.sum("amount", {
      where: { status: "completed" },
    });

    // Count of donors (unique users who have made completed donations)
    const donorCount = await Donation.count({
      distinct: true,
      col: "userId",
      where: { status: "completed" },
    });

    // Recent donations (last 5)
    const recentDonations = await Donation.findAll({
      where: { status: "completed" },
      include: [
        {
          model: Project,
          attributes: ["id", "title"],
        },
      ],
      limit: 5,
      order: [["donationDate", "DESC"]],
      attributes: ["id", "amount", "donationDate", "projectId"],
    });

    // Project-wise statistics
    const projectStats = await Project.findAll({
      attributes: [
        "id",
        "title",
        "fundingGoal",
        "fundingCurrent",
        [
          db.sequelize.literal(
            "(CASE WHEN \"fundingGoal\" > 0 THEN (\"fundingCurrent\" / \"fundingGoal\" * 100) ELSE 0 END)"
          ),
          "percentageFunded",
        ],
      ],
      where: {
        fundingGoal: { [Op.gt]: 0 }, // Only projects with funding goals
      },
      order: [
        [db.sequelize.literal("percentageFunded"), "DESC"],
      ],
      limit: 5,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalRaised: totalRaised || 0,
        donorCount: donorCount || 0,
        recentDonations,
        topProjects: projectStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific donation by ID (admin or owner)
exports.getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findByPk(req.params.id, {
      include: [
        {
          model: Project,
          attributes: ["id", "title"],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });

    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found." });
    }

    // Check if user is admin or the donor
    if (req.user && (req.user.role === "admin" || donation.userId === req.userId)) {
      return res.status(200).json({ success: true, donation });
    } else {
      return res.status(403).json({ success: false, message: "Not authorized to view this donation." });
    }
  } catch (error) {
    next(error);
  }
};

// Update donation status (e.g., after payment confirmation, admin only)
exports.updateDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findByPk(req.params.id);

    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation not found." });
    }

    // Update status
    donation.status = status;
    await donation.save();

    // If status is "completed", update project funding if applicable
    if (status === "completed" && donation.projectId) {
      const project = await Project.findByPk(donation.projectId);
      if (project) {
        project.fundingCurrent = parseFloat(project.fundingCurrent) + parseFloat(donation.amount);
        await project.save();
      }
    }

    res.status(200).json({ success: true, message: "Donation status updated successfully.", donation });
  } catch (error) {
    next(error);
  }
};
