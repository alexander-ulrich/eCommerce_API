import { Document, model, Schema, Types } from "mongoose";

// export interface IOrder extends Document {
//   userId: string;
//   products: [{ product: string; quantity: number }];
//   total: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

const lineItemSchema = new Schema({
  lineItem: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
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

export default model("Order", orderSchema);
