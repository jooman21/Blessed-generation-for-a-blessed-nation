const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'upcoming', 'completed'),
    defaultValue: 'active'
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fundingGoal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  fundingCurrent: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  impactMetrics: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

module.exports = Project;
