import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string; // custom slug or string id
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  badge?: string;
  sizes: string[];
  stock: number;
  isActive: boolean;
  priceUnconfirmed?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    features: { type: [String], default: [] },
    images: { type: [String], default: [] },
    badge: { type: String },
    sizes: { type: [String], default: ["XS", "S", "M", "L", "XL", "XXL"] },
    stock: { type: Number, default: 50, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    priceUnconfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

