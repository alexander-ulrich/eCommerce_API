import type z from "zod";
import { userInputSchema, userSchema } from "#schemas";
import type { RequestHandler } from "express";
import { User } from "#models";

type UserInputDTO = z.infer<typeof userInputSchema>;
type UserDTO = z.infer<typeof userSchema>;

export const getAllUsers: RequestHandler<unknown, UserDTO[], unknown> = async (
  req,
  res
) => {
  const userList = await User.find().lean();

  if (!userList.length)
    throw new Error("No registered Users found.", { cause: { status: 404 } });

  return res.json(userList);
};

export const registerUser: RequestHandler<
  unknown,
  UserDTO,
  UserInputDTO
> = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select("-password").lean();
  if (user)
    throw new Error("User with this E-Mail already exists!", {
      cause: { status: 409 },
    });

  await User.create<UserInputDTO>(req.body);
  const newUser = await User.findOne({ email }).select("-password").lean();

  return res.status(201).json(newUser!);
};

export const getUserByID: RequestHandler<
  { id: string },
  UserDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password").lean();
  if (!user) throw new Error("User not found.", { cause: { status: 404 } });

  return res.json(user);
};

export const updateUserByID: RequestHandler<
  { id: string },
  UserDTO,
  UserDTO
> = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found.", { cause: { status: 404 } });

  user.name = name;
  user.email = email;

  await user.save();
  const updatedUser = await User.findById(id).select("-password");
  return res.json(updatedUser!);
};

export const deleteUserByID: RequestHandler<
  { id: string },
  UserDTO,
  UserInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id, {
    new: true,
    runValidators: true,
  }).lean();
  if (!deletedUser)
    throw new Error("User not found.", { cause: { status: 404 } });

  return res.json(deletedUser);
};
