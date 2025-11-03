import z from "zod";

export const userInputSchema = z
  .object({
    name: z
      .string({ message: "Name is required." })
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    password: z
      .string({ message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    email: z
      .string({ message: "Email is required." })
      .regex(
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
        { message: "Email must be a valid email." }
      ),
  })
  .strict();
