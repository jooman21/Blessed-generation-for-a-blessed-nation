const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const News = sequelize.define("News", {
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
  author: {
    type: DataTypes.STRING, // Or link to a User ID if authors are users
    allowNull: true,
  },
  publishDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  featuredImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
});

module.exports = News;

