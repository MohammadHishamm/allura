import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string_here";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });