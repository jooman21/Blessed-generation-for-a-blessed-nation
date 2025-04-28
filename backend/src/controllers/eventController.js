const db = require("../models");
const Event = db.Event;
const { Op } = require("sequelize");

// Get all events with pagination and filtering
exports.getAllEvents = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10, upcoming = true } = req.query;
    const whereClause = { isPublished: true };

    if (category) whereClause.category = category;
    
    // Filter for upcoming events by default
    if (upcoming === 'true') {
      whereClause.startDate = { [Op.gte]: new Date() };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Event.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["startDate", "ASC"]], // Order by start date, soonest first
    });

    res.status(200).json({
      success: true,
      totalEvents: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      events: rows,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single event by ID
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event || !event.isPublished) {
      return res.status(404).json({ success: false, message: "Event not found or not published." });
    }

    res.status(200).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

// Create a new event (Admin only)
exports.createEvent = async (req, res, next) => {
  try {
    const { 
      title, description, category, location, 
      startDate, endDate, registrationLink, featuredImage, isPublished 
    } = req.body;

    // Basic validation
    if (!title || !description || !location || !startDate) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const newEvent = await Event.create({
      title,
      description,
      category,
      location,
      startDate,
      endDate,
      registrationLink,
      featuredImage,
      isPublished: isPublished !== undefined ? isPublished : true,
    });

    res.status(201).json({ success: true, message: "Event created successfully.", event: newEvent });
  } catch (error) {
    next(error);
  }
};

// Update an event (Admin only)
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    // Update event fields
    await event.update(req.body);

    res.status(200).json({ success: true, message: "Event updated successfully.", event });
  } catch (error) {
    next(error);
  }
};

// Delete an event (Admin only)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    await event.destroy();

    res.status(200).json({ success: true, message: "Event deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Get events by category
exports.getEventsByCategory = async (req, res, next) => {
  try {
    const events = await Event.findAll({ 
      where: { 
        category: req.params.category, 
        isPublished: true,
        startDate: { [Op.gte]: new Date() } // Only upcoming events
      },
      order: [["startDate", "ASC"]]
    });
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

// Get events by date range
exports.getEventsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.params;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Start date and end date are required." });
    }

    const events = await Event.findAll({ 
      where: { 
        startDate: { [Op.between]: [new Date(startDate), new Date(endDate)] },
        isPublished: true
      },
      order: [["startDate", "ASC"]]
    });
    res.status(200).json({ success: true, events });
  } catch (error) {
    next(error);
  }
};

// Register for an event (requires authentication)
// Note: This is a placeholder. In a real implementation, you would create a join table
// between users and events to track registrations.
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event || !event.isPublished) {
      return res.status(404).json({ success: false, message: "Event not found or not published." });
    }

    // Check if event date has passed
    if (new Date(event.startDate) < new Date()) {
      return res.status(400).json({ success: false, message: "Cannot register for past events." });
    }

    // In a real implementation, you would:
    // 1. Check if user is already registered
    // 2. Create a record in a UserEvents join table
    // 3. Possibly send confirmation email
    // 4. Update event capacity if applicable

    res.status(200).json({ 
      success: true, 
      message: "Registration successful. This is a placeholder - actual registration logic would be implemented in production.",
      userId: req.userId,
      eventId: event.id
    });
  } catch (error) {
    next(error);
  }
};
