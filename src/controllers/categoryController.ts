import { Category } from "#models";
import type { categoryInputSchema } from "#schemas";
import type { RequestHandler } from "express";
import type z from "zod";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryDTO = CategoryInputDTO;

export const getAllCategories: RequestHandler<
  unknown,
  CategoryDTO[],
  unknown
> = async (req, res) => {
  const categoryList = await Category.find().lean();

  if (!categoryList.length)
    throw new Error("No Categories found.", { cause: { status: 404 } });

  return res.json(categoryList);
};

export const createNewCategory: RequestHandler<
  unknown,
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findOne({ name }).lean();
  if (category)
    throw new Error("Category with this name already exists!", {
      cause: { status: 409 },
    });

  const newCategory = await Category.create<CategoryInputDTO>(req.body);

  return res.status(201).json(newCategory);
};

export const getCategoryByID: RequestHandler<
  { id: string },
  CategoryDTO,
  unknown
> = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).lean();
  if (!category)
    throw new Error("Category not found.", { cause: { status: 404 } });

  return res.json(category);
};

export const updateCategoryByID: RequestHandler<
  { id: string },
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body as CategoryDTO;
  let category = await Category.findById(id);
  if (!category)
    throw new Error("Category not found.", { cause: { status: 404 } });

  category.name = name;

  const updatedCategory = await category.save();

  return res.json(updatedCategory);
};

export const deleteCategoryByID: RequestHandler<
  { id: string },
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndDelete(id, {
    new: true,
  }).lean();
  if (!deletedCategory)
    throw new Error("Category not found.", { cause: { status: 404 } });

  return res.json(deletedCategory);
};
