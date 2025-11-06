import { Document, model, Schema } from "mongoose";

// interface IProduct extends Document {
//   name: string;
//   description: string;
//   price: number;
//   categoryId: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
