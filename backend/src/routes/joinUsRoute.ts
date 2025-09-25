import express from 'express';
import { createJoinUsApplication, getAllJoinUsApplications, updateApplicationStatus } from '../services/joinUsService';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/cvs/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only PDF, DOC, and DOCX files
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error('Only PDF, DOC, and DOCX files are allowed!') as any;
      cb(error, false);
    }
  }
});

const router = express.Router();

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dp73jqfre';
const apiKey = process.env.CLOUDINARY_API_KEY || '779373268411189';
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiSecret) {
  console.error('❌ CLOUDINARY_API_SECRET is required in .env file');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

// Create a new join us application
router.post('/', upload.single('cv'), async (req, res) => {
  try {
    console.log("📩 Join Us application request body:", req.body);
    console.log("📁 Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    // Upload to Cloudinary
    console.log("☁️ Uploading CV to Cloudinary...");
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'raw',
      public_id: `cvs/cv-${Date.now()}`,
      folder: 'cvs',
    });

    const cvUrl = cloudinaryResponse.secure_url;
    console.log("✅ CV uploaded to Cloudinary:", cvUrl);

    // Clean up local file
    fs.unlinkSync(req.file.path);

    const { fullName, role, description } = req.body;
    const result = await createJoinUsApplication({ 
      fullName, 
      role, 
      description, 
      cvUrl,
      status: 'pending'
    } as any);
    
    console.log("✅ Join Us application result:", result);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Join Us application error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all join us applications (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const result = await getAllJoinUsApplications();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Get join us applications error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update application status (for admin purposes)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateApplicationStatus(id, status);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Update application status error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
