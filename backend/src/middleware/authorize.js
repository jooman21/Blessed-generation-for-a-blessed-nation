const { User } = require("../models"); // Will be created later

/**
 * Middleware to authorize users based on roles
 * Checks if the authenticated user has the required role(s)
 * 
 * @param {string[]} allowedRoles - Array of roles allowed to access the route
 */
const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // This middleware should run after the authenticate middleware
      if (!req.userId) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required. User not found in request."
        });
      }

      // Fetch user details including role (Commented out until User model is created)
      // const user = await User.findByPk(req.userId, { attributes: ["role"] });
      
      // if (!user) {
      //   return res.status(401).json({ 
      //     success: false, 
      //     message: "User not found."
      //   });
      // }
      
      // --- Temporary Role Check (Replace with actual user role check) ---
      // For now, let's assume a role is passed in a header or query for testing
      // In reality, this should come from the authenticated user object (req.user.role)
      const userRole = req.headers["x-user-role"] || "donor"; // Example: Get role from header, default to 'donor'
      // --- End Temporary Role Check ---

      // Check if the user's role is included in the allowed roles
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          success: false, 
          message: "Forbidden. You do not have permission to access this resource."
        });
      }

      // User is authorized, proceed to the next middleware or route handler
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;

