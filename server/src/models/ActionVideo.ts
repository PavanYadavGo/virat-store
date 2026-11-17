import mongoose, { Schema, Document } from "mongoose";

export interface IActionVideo extends Document {
  id: string; // custom slug or string id (e.g. see-it-in-action-01)
  title: string;
  description: string;
  platform: "Instagram" | "Facebook" | "YouTube" | "Other" | string;
  videoUrl: string;
  posterUrl: string;
  externalUrl?: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ActionVideoSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    platform: {
      type: String,
      required: true,
      enum: ["Instagram", "Facebook", "YouTube", "Other"],
      default: "Instagram",
    },
    videoUrl: { type: String, required: true, trim: true },
    posterUrl: { type: String, required: true, trim: true },
    externalUrl: { type: String, trim: true },
    isPublished: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, required: true, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const ActionVideoModel = mongoose.model<IActionVideo>(
  "ActionVideo",
  ActionVideoSchema
);
