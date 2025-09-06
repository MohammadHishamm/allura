import mongoose, { Document, Schema } from "mongoose";

export interface IUser{
    username: string;
    email: string;
    password: string;
    plan: string;
    createdAt: Date;
    isAdmin: boolean;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    plan: { type: String, default: "Free" },
});

export const userModel = mongoose.model<IUser & Document>("User", userSchema);
