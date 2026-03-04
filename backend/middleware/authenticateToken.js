const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/jwt');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
