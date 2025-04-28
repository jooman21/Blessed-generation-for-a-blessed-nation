const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Will be created later

/**
 * Middleware to authenticate JWT tokens
 * Verifies the token and attaches the user to the request object
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required. No token provided or invalid format.' 
      });
    }
    
    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by id from decoded token
    // Commented out until User model is created
    // const user = await User.findByPk(decoded.id);
    
    // if (!user) {
    //   return res.status(401).json({ 
    //     success: false, 
    //     message: 'User not found or token is invalid.' 
    //   });
    // }
    
    // Attach user to request object
    // req.user = user;
    req.userId = decoded.id; // Temporary solution until User model is created
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token.' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired. Please login again.' 
      });
    }
    
    next(error);
  }
};

module.exports = authenticate;
