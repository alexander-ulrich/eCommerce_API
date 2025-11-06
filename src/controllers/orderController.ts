import { Order, Product } from "#models";
import type { orderInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import mongoose from "mongoose";
import type z from "zod";

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = {
  userId: string;
  products: {
    lineItem: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  total: number;
};

export const getAllOrders: RequestHandler<
  unknown,
  OrderDTO[],
  unknown
> = async (req, res) => {
  const orderList = await Order.find();

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
  for (const p of products) {
    const product = await Product.findById(p.lineItem).lean();
    if (!product)
      throw new Error("Product not found!", { cause: { status: 404 } });
    total += product.price * p.quantity;
  }
  const newOrder = await Order.create<OrderInputDTO>({
    userId: userId,
    products: products,
  });
  newOrder.total = Number(total.toFixed(2));
  newOrder.save();
  return res.status(201).json(newOrder);
};

export const getOrderByID: RequestHandler<
  { id: string },
  OrderDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

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
    {
      _id: id,
    },
    { products: products, userId: userId, total: Number(total.toFixed(2)) },
    { new: true }
  );
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

  const deletedOrder = await Order.findByIdAndDelete(id, {
    new: true,
  });
  if (!deletedOrder)
    throw new Error("Order not found.", { cause: { status: 404 } });

  return res.json(deletedOrder);
};
