import z from "zod";

export const categoryInputSchema = z
  .object({
    name: z
      .string({ message: "Category name is required." })
      .min(2, { message: "Category name must be at least 2 characters long." })
      .trim(),
  })
  .strict();
