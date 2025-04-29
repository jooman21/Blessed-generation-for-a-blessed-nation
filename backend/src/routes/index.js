const express = require("express");
const router = express.Router();

// Import all route modules
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const projectRoutes = require("./projectRoutes");
const newsRoutes = require("./newsRoutes");
const eventRoutes = require("./eventRoutes");
const volunteerRoutes = require("./volunteerRoutes");
const donationRoutes = require("./donationRoutes");
const storyRoutes = require("./storyRoutes");
const teamRoutes = require("./teamRoutes");
const partnerRoutes = require("./partnerRoutes");
const contactRoutes = require("./contactRoutes");
const faqRoutes = require("./faqRoutes");
const createAdminRoute = require("./createAdminRoute");
// Mount all routes
router.use("/auth", authRoutes);
router.use("/AdminAuth", createAdminRoute);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/news", newsRoutes);
router.use("/events", eventRoutes);
router.use("/volunteer", volunteerRoutes);
router.use("/donations", donationRoutes);
router.use("/stories", storyRoutes);
router.use("/team", teamRoutes);
router.use("/partners", partnerRoutes);
router.use("/contact", contactRoutes);
router.use("/faqs", faqRoutes);

module.exports = router;
