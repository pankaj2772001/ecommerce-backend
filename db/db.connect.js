const mongoose = require("mongoose");
require("dotenv").config();

const mongooseUri = process.env.MONGODB;

async function initializeData() {
  try {
    await mongoose
      .connect(mongooseUri)
      .then(() => {
        console.log("DB Connected");
      })
      .catch((error) => {
        console.log("Failed to connect db", error);
      });
  } catch (error) {
    console.log("Failed to connect db", error);
  }
}

module.exports = { initializeData };
