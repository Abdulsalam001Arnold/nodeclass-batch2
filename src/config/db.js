

// config/db.js
const mongoose = require("mongoose");

let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState;
    console.log("🚀 New MongoDB connection established!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
