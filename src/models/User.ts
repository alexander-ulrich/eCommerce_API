import z from "zod";
import { userInputSchema } from "#schemas";
import { model, Schema } from "mongoose";

export type UserType = z.infer<typeof userInputSchema>;

const userSchema = new Schema<UserType>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<UserType>("User", userSchema);
