import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  products: string[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    products: {
      type: [Types.ObjectId],
      ref: "LineItem",
      default: [],
      required: true,
    },
    total: { type: Number, default: 0.0, required: true },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
