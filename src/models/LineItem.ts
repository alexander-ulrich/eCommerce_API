import { Document, model, Schema, Types } from "mongoose";

interface ILineItem extends Document {
  productId: String;
  quantity: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

const lineItemSchema = new Schema<ILineItem>(
  {
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILineItem>("Category", lineItemSchema);
