import { Order, Product, User } from "#models";
import type { orderInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import mongoose from "mongoose";
import type z from "zod";

type OrderInputDTO = z.infer<typeof orderInputSchema>;

type PopulatedProduct = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
};

type PopulatedUser = {
  _id: mongoose.Types.ObjectId;
  name: string;
};

type OrderDTO = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  products: {
    lineItem: mongoose.Types.ObjectId | PopulatedProduct;
    quantity: number;
    _id?: mongoose.Types.ObjectId;
  }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllOrders: RequestHandler<
  unknown,
  OrderDTO[],
  unknown
> = async (req, res) => {
  const orderList = await Order.find()
    .populate("userId", "name")
    .populate("products.lineItem", "name price")
    .lean<OrderDTO[]>();

  if (orderList.length < 1)
    throw new Error("No orders found.", { cause: { status: 404 } });

  return res.json(orderList);
};

export const placeOrder: RequestHandler<
  unknown,
  OrderDTO,
  OrderInputDTO
> = async (req, res) => {
  const { products, userId } = req.body;
  let total = 0;

  let user = await User.findById(userId);
  if (!user) throw new Error("User not found.", { cause: { status: 404 } });

  for (const p of products) {
    const product = await Product.findById(p.lineItem).lean();
    if (!product)
      throw new Error("Product not found!", { cause: { status: 404 } });
    total += product.price * p.quantity;
  }

  const newOrder = await Order.create({
    userId: userId,
    products: products,
    total: Number(total.toFixed(2)),
  });

  const populatedOrder = await Order.findById(newOrder._id)
    .populate("userId", "name")
    .populate("products.lineItem", "name price")
    .lean<OrderDTO>();

  if (!populatedOrder)
    throw new Error("Order not found.", { cause: { status: 404 } });

  return res.status(201).json(populatedOrder);
};

export const getOrderByID: RequestHandler<
  { id: string },
  OrderDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("userId", "name")
    .populate("products.lineItem", "name price")
    .lean<OrderDTO>();

  if (!order) throw new Error("Order not found.", { cause: { status: 404 } });

  return res.json(order);
};

export const updateOrderByID: RequestHandler<
  { id: string },
  OrderDTO,
  OrderInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { products, userId } = req.body as OrderInputDTO;

  let user = await User.findById(userId);
  if (!user) throw new Error("User not found.", { cause: { status: 404 } });

  let order = await Order.findById(id);
  if (!order) throw new Error("Order not found.", { cause: { status: 404 } });

  let total = 0;
  for (const p of products) {
    const product = await Product.findById(p.lineItem).lean();
    if (!product)
      throw new Error("Product not found!", { cause: { status: 404 } });
    total += product.price * p.quantity;
  }
  const newOrder = await Order.findByIdAndUpdate(
    { _id: id },
    { products: products, userId: userId, total: Number(total.toFixed(2)) },
    { new: true }
  )
    .populate("userId", "name")
    .populate("products.lineItem", "name price")
    .lean<OrderDTO>();

  if (!newOrder)
    throw new Error("Order not found.", { cause: { status: 404 } });

  return res.json(newOrder);
};

export const deleteOrderByID: RequestHandler<
  { id: string },
  OrderDTO,
  OrderInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(id)
    .populate("userId", "name")
    .populate("products.lineItem", "name price")
    .lean<OrderDTO>();

  if (!deletedOrder)
    throw new Error("Order not found.", { cause: { status: 404 } });

  return res.json(deletedOrder);
};
