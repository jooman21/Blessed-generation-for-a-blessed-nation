const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Donation = sequelize.define("Donation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users", // Name of the Users table
      key: "id",
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: true, // Donation might not be tied to a specific project
    references: {
      model: "Projects", // Name of the Projects table
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  donationType: {
    type: DataTypes.ENUM("one-time", "monthly"),
    defaultValue: "one-time",
  },
  paymentGatewayId: {
    type: DataTypes.STRING, // ID from the payment gateway (e.g., Stripe charge ID)
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed"),
    defaultValue: "pending",
  },
  donationDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = Donation;

