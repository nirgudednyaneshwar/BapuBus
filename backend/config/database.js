const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Connection Failed", error.message);
    process.exit(1);
  }
};

module.exports=connectToDB;
