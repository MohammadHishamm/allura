import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dp73jqfre';
const apiKey = process.env.CLOUDINARY_API_KEY || '779373268411189';
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiSecret) {
  console.error('❌ CLOUDINARY_API_SECRET is required in .env file');
  console.error('Please add CLOUDINARY_API_SECRET=your_api_secret to your .env file');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});

export const uploadVideoToCloudinary = async (filePath: string, publicId?: string) => {
  try {
    console.log('📤 Uploading video to Cloudinary...', filePath);
    
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: publicId || `project-video-${Date.now()}`,
      folder: 'project-videos',
      chunk_size: 6000000, // 6MB chunks for large videos
      // Removed eager transformations to avoid signature issues
    });

    console.log('✅ Video uploaded successfully:', result.secure_url);
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration
    };
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
};

export const deleteVideoFromCloudinary = async (publicId: string) => {
  try {
    console.log('🗑️ Deleting video from Cloudinary:', publicId);
    
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'video'
    });

    console.log('✅ Video deleted successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Cloudinary delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed'
    };
  }
};
