import mongoose, { Document, Schema } from "mongoose";

export interface IJoinUs {
    fullName: string;
    role: string;
    description: string;
    cvUrl: string; // Cloudinary URL for the uploaded CV
    createdAt: Date;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected'; // Application status
}

const joinUsSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    cvUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
});

export const joinUsModel = mongoose.model<IJoinUs & Document>("JoinUs", joinUsSchema);
