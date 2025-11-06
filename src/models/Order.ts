import { Document, model, Schema, Types } from "mongoose";

export interface IOrder extends Document {
  userId: String;
  products: [{ product: String; quantity: Number }];
  total: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

const lineItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: {
      type: [lineItemSchema],
      default: [],
      required: true,
    },
    total: { type: Number, default: 0.0, required: true },
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
