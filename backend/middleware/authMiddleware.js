const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized! Bearer token missing",
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Store user ID in request
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

module.exports = {
  authMiddleware,
};