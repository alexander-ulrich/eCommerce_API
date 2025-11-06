import { Order, Product } from "#models";
import type { orderInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import type z from "zod";

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = OrderInputDTO & { total: number };

export const getAllOrders: RequestHandler<
  unknown,
  OrderDTO[],
  OrderInputDTO
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
    const product = Product.findById(p.lineItem);
    total += product.price * p.quantity;
  }
  const newOrder = await Order.create<OrderInputDTO>({
    userId: userId,
    products: products,
  });
  newOrder.total = total;
  return res.status(201).json(newOrder);
};
