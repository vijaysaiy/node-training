import fs from "fs";
import XLSX from "xlsx-js-style";
import { Product } from "./products.model.js";
export const findById = async (id) => {
  return await Product.findById(id);
};

export const find = async (sortBy, direction) => {
  if (sortBy) {
    return await Product.find().sort({ [sortBy]: direction });
  }
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

export const saveFromExcel = async (path) => {
  const workbook = XLSX.readFile(path);
  const sheetNamesList = workbook.SheetNames;
  let productsList = [];
  for (const sheetName of sheetNamesList) {
    const products = XLSX.utils
      .sheet_to_json(workbook.Sheets[sheetName])
      .map((product) => ({
        name: product.Name,
        price: product.Price,
        image: product.Image,
        description: product.Description,
      }));

    productsList = [...productsList, ...products];
  }
  try {
    const savedProducts = await saveMany(productsList);
    fs.unlinkSync(path);
    return savedProducts;
  } catch (error) {
    throw error;
  }
};
