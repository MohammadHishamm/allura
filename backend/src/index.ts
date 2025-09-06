import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRouter from "./routes/projectRoute";
import userRouter from "./routes/userRoute";
import uploadRouter from "./routes/uploadRoute";
import cors from "cors";

dotenv.config();


const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_connection_string_here";











//////////////////////////////////////////////
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());
app.use(cors());
app.use("/projects", projectRouter);
app.use("/user", userRouter);
app.use("/upload", uploadRouter);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });