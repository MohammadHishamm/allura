import mongoose , { Schema, Document} from "mongoose";

export interface IPorject{
    name: string;
    description: string;
    createdAt: Date;
    video: string;
    tags: string[];
    githubLink?: string;
}

const projectSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    video: { type: String, required: true },
    tags: { type: [String] },
    githubLink: { type: String },
});

export const ProjectModel = mongoose.model<IPorject & Document>("projects", projectSchema);
