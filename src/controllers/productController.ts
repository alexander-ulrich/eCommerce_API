import { Category, Product } from "#models";
import type { productInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import type z from "zod";

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = ProductInputDTO;

export const getAllProducts: RequestHandler<
  unknown,
  ProductDTO[],
  unknown
> = async (req, res) => {
  let productList = [];
  if (req.query.categoryId) {
    productList = await Product.find({
      categoryId: req.query.categoryId,
    }).populate("categoryId");
  } else {
    productList = await Product.find().populate("categoryId");
  }
  if (!productList.length)
    throw new Error("No Products found.", { cause: 404 });

  return res.json(productList);
};

export const createNewProduct: RequestHandler<
  unknown,
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { name, categoryId } = req.body;
  const product = await Product.findOne({ name });
  if (product)
    throw new Error("Product with this name already exists!", { cause: 409 });
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Invalid Product category!", { cause: 400 });
  const newProduct = await Product.create<ProductInputDTO>(req.body);

  return res.status(201).json(await Product.populate(newProduct, "categoryId"));
};

export const getProductByID: RequestHandler<
  { id: string },
  ProductDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("categoryId");
  if (!product) throw new Error("Product not found.", { cause: 404 });

  return res.json(product);
};

export const updateProductByID: RequestHandler<
  { id: string },
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId } = req.body as ProductDTO;

  const product = await Product.findOne({ name });
  if (product)
    throw new Error("Product with this name already exists!", { cause: 409 });

  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Invalid Product category!", { cause: 400 });

  let oldProduct = await Product.findById(id).populate("categoryId");
  if (!oldProduct) throw new Error("Product not found.", { cause: 404 });

  oldProduct.name = name;
  oldProduct.description = description;
  oldProduct.price = price;
  oldProduct.categoryId = categoryId;

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
  }).populate("categoryId");
  if (!deletedProduct) throw new Error("Product not found.", { cause: 404 });

  return res.json(deletedProduct);
};
