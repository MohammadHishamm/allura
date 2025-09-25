import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRouter from "./routes/projectRoute";
import userRouter from "./routes/userRoute";
import uploadRouter from "./routes/uploadRoute";
import contactRouter from "./routes/contactRoute";
import joinUsRouter from "./routes/joinUsRoute";
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

// CORS configuration for Vercel deployment
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-vercel-app.vercel.app', // Replace with your actual Vercel URL
    'https://*.vercel.app' // Allow all Vercel subdomains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} from ${req.get('origin') || 'unknown'}`);
  next();
});
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use("/projects", projectRouter);
app.use("/user", userRouter);
app.use("/upload", uploadRouter);
app.use("/contact", contactRouter);
app.use("/joinus", joinUsRouter);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });