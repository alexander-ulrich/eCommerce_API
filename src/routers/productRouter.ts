import {
  createNewProduct,
  deleteProductByID,
  getAllProducts,
  getProductByID,
  updateProductByID,
} from "#controllers";
import express, { Router } from "express";

const productRouter = Router();

//Valid Routes
productRouter.get("/", express.urlencoded(), getAllProducts);
productRouter.post("/", createNewProduct);

productRouter.get("/:id", getProductByID);
productRouter.put("/:id", updateProductByID);
productRouter.delete("/:id", deleteProductByID);

//Method not allowed
productRouter.put("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
productRouter.patch("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
productRouter.delete("/", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

productRouter.post("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);
productRouter.patch("/:id", (req, res) =>
  res.status(405).json({ message: "Error: 405 Method not allowed!" })
);

export default productRouter;
