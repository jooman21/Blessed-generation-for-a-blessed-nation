const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Partner = sequelize.define("Partner", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  partnershipType: {
    type: DataTypes.STRING, // e.g., 'corporate', 'nonprofit', 'government', 'academic'
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

module.exports = Partner;
