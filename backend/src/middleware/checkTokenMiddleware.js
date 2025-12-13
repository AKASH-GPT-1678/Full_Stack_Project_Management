const jwt = require('jsonwebtoken');
const { verifyToken } = require("../controllers/project.controller.js")
const decodeToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // If no token is sent, just move on
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  console.log(token);


  if (!token) {
    return res.status(401).json({ message: 'Token missing' , status : 401 , verified :false });
  }

  try {
    const decoded = await verifyToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' , status : 403 , verified :false});
  }
};


module.exports = decodeToken;
