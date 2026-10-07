
const express = require("express");

const Router = express.Router();

const {
  registerPassenger,
  loginPassenger,
  refreshToken,
  logout,
  profile,
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");

// Public routes
Router.post("/register", registerPassenger);
Router.post("/login", loginPassenger);
Router.post("/refreshToken", refreshToken);

// Protected routes
Router.post("/logout", authMiddleware, logout);
Router.get("/user", authMiddleware, profile);

module.exports = Router;