import mongoose, { Document, Schema } from "mongoose";

export interface IContact {
    firstName: string;
    lastName: string;
    projectTypes: string[]; // Array of selected project types
    projectDescription: string;
    phoneNumber: string;
    potentialBudget: string;
    createdAt: Date;
}

const contactSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    projectTypes: [{ type: String, required: true }], // Array of strings for multiple selections
    projectDescription: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    potentialBudget: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const contactModel = mongoose.model<IContact & Document>("Contact", contactSchema);
