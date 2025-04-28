const sequelize = require("../config/database");

// Import models
const User = require("./User");
const Project = require("./Project");
const News = require("./News");
const Event = require("./Event");
const Volunteer = require("./Volunteer");
const Donation = require("./Donation");
const Story = require("./Story");
const TeamMember = require("./TeamMember");
const Partner = require("./Partner");
const FAQ = require("./FAQ");
const ContactSubmission = require("./ContactSubmission");

// Define Relationships

// User Relationships
User.hasMany(Donation, { foreignKey: "userId" });
Donation.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Story, { foreignKey: "userId" }); // User can submit stories/testimonials
Story.belongsTo(User, { foreignKey: "userId" });

// Project Relationships
Project.hasMany(Donation, { foreignKey: "projectId" });
Donation.belongsTo(Project, { foreignKey: "projectId" });

// Relationships for Volunteer Applications (Need a join table or direct link)
// Example: User can apply for Volunteer opportunities
// User.belongsToMany(Volunteer, { through: "UserVolunteerApplications" });
// Volunteer.belongsToMany(User, { through: "UserVolunteerApplications" });

// Relationships for Event Registrations (Need a join table or direct link)
// Example: User can register for Events
// User.belongsToMany(Event, { through: "UserEventRegistrations" });
// Event.belongsToMany(User, { through: "UserEventRegistrations" });

// Export all models and sequelize instance
const db = {
  sequelize,
  User,
  Project,
  News,
  Event,
  Volunteer,
  Donation,
  Story,
  TeamMember,
  Partner,
  FAQ,
  ContactSubmission,
};

module.exports = db;

