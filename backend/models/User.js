const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [1, "Name Cannot be empty"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return value.includes("@");
        },
        message: "Email must contain @",
      },
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone connot be empty"],
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message: "Phone number must be exactly 10 digit",
      },
      unique: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      minLength: [8, "Password must be at least 8 digit!"],
      select: false,
    },

    role: {
      type: String,
      enum: ["passenger", "admin"],
      default: "passenger",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
