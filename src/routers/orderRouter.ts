import { Router } from "express";

const orderRouter = Router();

//Valid Routes
orderRouter.get("/", getAllOrders);
orderRouter.post("/", placeNewOrder);

orderRouter.get("/:id", getOrderByID);
orderRouter.put("/:id", updateOrderByID);
orderRouter.delete("/:id", deleteOrderByID);

//Method not allowed
orderRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.delete("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

orderRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
orderRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default orderRouter;
