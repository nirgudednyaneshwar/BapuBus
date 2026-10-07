const User = require("../models/User");
const bcrypt = require("bcrypt");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.utils");

const { jsonwebtoken } = require("jsonwebtoken");
const registerPassenger = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Name,email,phone,password must be required",
      });
    }

    if (name.trim().length < 1) {
      return res.status(400).json({
        message: "Name cannot be empty",
      });
    }

    const emailRegex = email.includes("@");

    if (!emailRegex) {
      return res.status(400).json({
        message: "Please enter a valid email",
      });
    }

    // 4. Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
      });
    }

    // 5. Password validation
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or Phone no already existed!",
      });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash: bcrypt.hashSync(password, 8),
      role: "passenger",
      status: "active",
    });
    await user.save();

    res.status(201).json({
      message: "Passenger registered successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while registration",
      error: error.message,
    });
  }
};

const loginPassenger = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user by email and include passwordHash
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+passwordHash");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Check account status
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Your account is not active",
      });
    }

    // 4. Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 5. Generate JWT tokens using user ID
    const accessToken = generateAccessToken(user._id.toString());

    const refreshToken = generateRefreshToken(user._id.toString());

    // 6. Send response
    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },

      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      auth: false,
      message: "Refresh token is required",
    });
  }

  try {
    const decoded = jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const userId = decoded.userId;

    const accessToken = generateAccessToken(userId);

    return res.status(200).json({
      message: "Access token generated successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error.message);

    return res.status(401).json({
      auth: false,
      message: "Invalid or expired refresh token",
    });
  }
};

const logout = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Logout successful",
  });
};

const profile = (req, res) => {
  return res.status(200).json({
    user: User.name,
  });
};

module.exports = {
  registerPassenger,
  loginPassenger,
  refreshToken,
  logout,
  profile,
};
