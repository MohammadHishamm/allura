import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { uploadVideoToCloudinary } from '../services/cloudinaryService';
import validateJWT from '../middleware/validateJWT';

const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `video-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is a video
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Upload video endpoint
router.post('/video', validateJWT, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No video file uploaded' 
      });
    }

    console.log('📁 Video file received:', req.file.filename);

    // Upload to Cloudinary
    const uploadResult = await uploadVideoToCloudinary(req.file.path, `project-video-${Date.now()}`);

    // Clean up local file
    fs.unlinkSync(req.file.path);
    console.log('🗑️ Local file cleaned up:', req.file.filename);

    if (uploadResult.success) {
      res.json({
        success: true,
        videoUrl: uploadResult.url,
        publicId: uploadResult.publicId,
        duration: uploadResult.duration
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to upload video to Cloudinary',
        error: uploadResult.error
      });
    }
  } catch (error) {
    console.error('❌ Upload error:', error);
    
    // Clean up local file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
