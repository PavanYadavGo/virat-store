import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Store Administrator" },
    role: { type: String, default: "admin" },
  },
  {
    timestamps: true,
  }
);

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

