const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// GET /api/team - Get all active team members (public)
router.get("/", teamController.getAllTeamMembers);

// GET /api/team/:id - Get a single team member by ID (public)
router.get("/:id", teamController.getTeamMemberById);

// POST /api/team - Create a new team member (admin only)
router.post("/", authenticate, authorize(["admin"]), teamController.createTeamMember);

// PUT /api/team/:id - Update a team member (admin only)
router.put("/:id", authenticate, authorize(["admin"]), teamController.updateTeamMember);

// DELETE /api/team/:id - Delete a team member (admin only)
router.delete("/:id", authenticate, authorize(["admin"]), teamController.deleteTeamMember);

module.exports = router;
