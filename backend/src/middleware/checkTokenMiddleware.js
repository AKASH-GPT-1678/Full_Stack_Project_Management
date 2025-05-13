const jwt = require('jsonwebtoken');
const { verifyToken } = require("../controllers/register.controller.js")
const decodeToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // If no token is sent, just move on
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = decodeToken;
