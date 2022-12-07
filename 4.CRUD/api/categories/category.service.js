import { Category } from "./category.model.js";

export const createCategory = async (categoryDetails) => {
  return await Category.create(categoryDetails);
};

export const findByName = async (name) => {
  return await Category.findOne({ name });
};
