const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Volunteer = sequelize.define("Volunteer", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // e.g., 'event-support', 'admin', 'field-work', 'fundraising', 'mentoring'
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING, // e.g., 'on-site', 'remote'
    allowNull: false,
  },
  timeCommitment: {
    type: DataTypes.STRING, // e.g., 'short-term', 'long-term', 'flexible'
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  requiredSkills: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('open', 'filled', 'closed'),
    defaultValue: 'open',
  },
  maxVolunteers: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  currentVolunteers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = Volunteer;
