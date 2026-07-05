const jwt = require('jsonwebtoken');

// Use in every protected route — works the same regardless of database
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'clinikx_secret_2024');
    next();
  } catch {
    res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ success: false, message: 'Access denied' });
  next();
};

module.exports = { verifyToken, authorizeRoles };