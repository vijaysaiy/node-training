import { Product } from "./products.model.js";

export const findById = async (id) => {
  return await Product.findById(id);
};

export const find = async () => {
  return await Product.find();
};

export const findByName = async (name) => {
  return await Product.find({ name });
};

export const save = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

export const saveMany = async (products) => {
  return await Product.insertMany(products);
};

export const deleteById = async (id) => {
  return await Product.findByIdAndDelete(id); // find and delete
};

export const deleteOne = async (id) => {
  return await Product.deleteOne({ _id: id }); // just delete
};
