const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Story = sequelize.define("Story", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("success_story", "testimonial"),
    allowNull: false,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: true, // Can be anonymous or linked to a user
  },
  authorRole: {
    type: DataTypes.STRING, // e.g., Beneficiary, Donor, Volunteer
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true, // Optional link to a registered user
    references: {
      model: "Users",
      key: "id",
    },
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Requires admin approval
  },
  submissionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = Story;

