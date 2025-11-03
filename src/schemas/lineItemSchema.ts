import z from "zod";

export const lineItemInputSchema = z
  .object({
    productId: z.string({ message: "Product ID is required." }),
    quantity: z
      .number({ message: "Product quantity is required." })
      .positive({ message: "Product quantity has to be positive." }),
  })
  .strict();
