require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const rateLimit = require("express-rate-limit"); // Will configure later

// Import main router
const apiRoutes = require("./src/routes"); // Changed from individual routes

// Import middleware
const errorHandler = require("./src/middleware/errorHandler");

// Import database configuration and models
const db = require("./src/models");

const app = express();

// --- Middleware --- 

// Security Headers
app.use(helmet());

// Enable CORS
// Configure allowed origins in production
app.use(cors()); 

// Body Parsers
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Rate Limiting (Example - configure as needed)
/*
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);
*/

// --- Routes --- 

// Basic health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", message: "Backend is running" });
});

// Mount all API routes under /api
app.use("/api", apiRoutes); // Use the main router

// --- Error Handling --- 

// 404 Not Found Middleware (for requests not handled by apiRoutes)
app.use((req, res, next) => {
  // Check if the request path starts with /api, if so, it's a 404 within the API
  if (req.path.startsWith("/api")) {
    const error = new Error("API endpoint not found");
    error.status = 404;
    next(error);
  } else {
    // If it doesn't start with /api, pass it along (might be handled by frontend routing in production)
    next();
  }
});

// Global Error Handler (must be last middleware)
app.use(errorHandler);

// --- Start Server --- 

const PORT = process.env.PORT || 5000;

// Test database connection and sync schema
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Sync models with database
    // Use { force: true } only in development to drop and recreate tables
    // Use { alter: true } in development to update tables based on model changes
    await db.sequelize.sync({ alter: true }); 
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database or sync schema:", error);
    process.exit(1); // Exit process with failure
  }
};

startServer();

