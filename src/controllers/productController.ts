import { Category, Product } from "#models";
import type { productInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import mongoose from "mongoose";
import type z from "zod";

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  categoryId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const getAllProducts: RequestHandler<
  unknown,
  ProductDTO[],
  unknown
> = async (req, res) => {
  let productList: ProductDTO[] = [];
  if (req.query.categoryId) {
    productList = await Product.find({
      categoryId: req.query.categoryId,
    })
      .populate("categoryId")
      .lean();
  } else {
    productList = await Product.find().populate("categoryId").lean();
  }
  if (!productList.length)
    throw new Error("No Products found.", { cause: { status: 404 } });

  return res.json(productList);
};

export const createNewProduct: RequestHandler<
  unknown,
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { name, categoryId } = req.body;
  const product = await Product.findOne({ name }).lean();
  if (product)
    throw new Error("Product with this name already exists!", {
      cause: { status: 409 },
    });
  const category = await Category.findById(categoryId).lean();
  if (!category)
    throw new Error("Invalid Product category!", { cause: { status: 400 } });
  const newProduct = await Product.create<ProductInputDTO>(req.body);

  return res.status(201).json(await Product.populate(newProduct, "categoryId"));
};

export const getProductByID: RequestHandler<
  { id: string },
  ProductDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categoryId").lean();
  if (!product)
    throw new Error("Product not found.", { cause: { status: 404 } });

  return res.json(product);
};

export const updateProductByID: RequestHandler<
  { id: string },
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body;

  const product = await Product.findOne({ _id: id }).lean();
  if (!product)
    throw new Error("No product found!", {
      cause: { status: 404 },
    });

  const category = await Category.findById(categoryId).lean();
  if (!category)
    throw new Error("Invalid Product category!", { cause: { status: 400 } });

  let oldProduct = await Product.findById(id).populate("categoryId");
  if (!oldProduct)
    throw new Error("Product not found.", { cause: { status: 404 } });

  oldProduct.name = name;
  oldProduct.description = description;
  oldProduct.price = price;
  oldProduct.categoryId = new mongoose.Types.ObjectId(categoryId);

  const updatedProduct = await oldProduct.save();

  return res.json(await Product.populate(updatedProduct, "categoryId"));
};

export const deleteProductByID: RequestHandler<
  { id: string },
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id, {
    new: true,
  })
    .populate("categoryId")
    .lean();
  if (!deletedProduct)
    throw new Error("Product not found.", { cause: { status: 404 } });

  return res.json(deletedProduct);
};
