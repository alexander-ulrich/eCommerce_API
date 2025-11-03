import { Document, model, Schema, Types } from "mongoose";

interface IProduct extends Document {
  name: String;
  description: String;
  price: Number;
  categoryId: String;
  createdAt?: Date;
  updatedAt?: Date;
}
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
