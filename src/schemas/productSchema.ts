import z from "zod";
export const productInputSchema = z
  .object({
    name: z.string({ message: "Product name is required." }).trim(),
    description: z.string({ message: "Description is required." }).trim(),
    price: z.number({ message: "Price is required." }),
    categoryId: z.string({ message: "Product category is required." }),
  })
  .strict();
