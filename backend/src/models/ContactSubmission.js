const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ContactSubmission = sequelize.define("ContactSubmission", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('new', 'in_progress', 'resolved'),
    defaultValue: 'new',
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  responseNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = ContactSubmission;
