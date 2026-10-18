import mongoose, { Schema, Document } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  deliveryStatus: "sent" | "mock_logged" | "failed";
  errorDetails?: string;
  createdAt: Date;
}

const ContactMessageSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    deliveryStatus: {
      type: String,
      enum: ["sent", "mock_logged", "failed"],
      default: "mock_logged",
    },
    errorDetails: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ContactMessageModel = mongoose.model<IContactMessage>(
  "ContactMessage",
  ContactMessageSchema
);

