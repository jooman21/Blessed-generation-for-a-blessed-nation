const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FAQ = sequelize.define("FAQ", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING, // e.g., 'general', 'donations', 'volunteering'
    allowNull: true,
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = FAQ;
