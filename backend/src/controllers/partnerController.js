const db = require("../models");
const Partner = db.Partner;

// Get all active partners
exports.getAllPartners = async (req, res, next) => {
  try {
    const partners = await Partner.findAll({
      where: { isActive: true },
      order: [["displayOrder", "ASC"], ["createdAt", "ASC"]], // Order by display order, then creation date
    });

    res.status(200).json({ success: true, partners });
  } catch (error) {
    next(error);
  }
};

// Get a single partner by ID
exports.getPartnerById = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id);

    if (!partner || !partner.isActive) {
      return res.status(404).json({ success: false, message: "Partner not found or not active." });
    }

    res.status(200).json({ success: true, partner });
  } catch (error) {
    next(error);
  }
};

// Create a new partner (Admin only)
exports.createPartner = async (req, res, next) => {
  try {
    const { name, description, logo, website, partnershipType, displayOrder, isActive } = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({ success: false, message: "Partner name is required." });
    }

    const newPartner = await Partner.create({
      name,
      description,
      logo,
      website,
      partnershipType,
      displayOrder: displayOrder || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({ success: true, message: "Partner created successfully.", partner: newPartner });
  } catch (error) {
    next(error);
  }
};

// Update a partner (Admin only)
exports.updatePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found." });
    }

    // Update partner fields
    await partner.update(req.body);

    res.status(200).json({ success: true, message: "Partner updated successfully.", partner });
  } catch (error) {
    next(error);
  }
};

// Delete a partner (Admin only)
exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findByPk(req.params.id);

    if (!partner) {
      return res.status(404).json({ success: false, message: "Partner not found." });
    }

    await partner.destroy();

    res.status(200).json({ success: true, message: "Partner deleted successfully." });
  } catch (error) {
    next(error);
  }
};

