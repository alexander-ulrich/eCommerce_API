import type { categoryInputSchema } from "#schemas";
import { model, Schema } from "mongoose";
import type z from "zod";

type CategoryType = z.infer<typeof categoryInputSchema>;

const categorySchema = new Schema<CategoryType>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<CategoryType>("Category", categorySchema);
