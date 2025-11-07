import {
  deleteUserByID,
  getAllUsers,
  getUserByID,
  registerUser,
  updateUserByID,
} from "#controllers";
import { validateBodyZod } from "#middlewares";
import { userInputSchema, userSchema } from "#schemas";
import { Router } from "express";

const userRouter = Router();

//Valid Routes
userRouter.get("/", getAllUsers);
userRouter.post("/", validateBodyZod(userInputSchema), registerUser);

userRouter.get("/:id", getUserByID);
userRouter.put("/:id", validateBodyZod(userSchema), updateUserByID);
userRouter.delete("/:id", deleteUserByID);

//Method not allowed
userRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
userRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
userRouter.delete("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

userRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
userRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default userRouter;
