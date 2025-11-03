import z from "zod";

export const orderInputSchema = z
  .object({
    userId: z.string({ message: "User ID is required to place an order." }),
    products: z.array(z.string({ message: "Line item is required." }), {
      message: "At least one line item is required to place an order.",
    }),
    total: z.number({ message: "Total cost is required to place an order." }),
  })
  .strict();
