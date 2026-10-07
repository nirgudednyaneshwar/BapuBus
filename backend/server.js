const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const { logger } = require("./middleware/loggerMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", logger, authRoutes);

const startServer = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log("Server startup failed", error.message);
  }
};

startServer();