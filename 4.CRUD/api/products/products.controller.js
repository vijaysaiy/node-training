import { errorHandler } from "../utils/ErrorHandler/errorHandler.js";
import { logger } from "../utils/logger/logger.js";
import * as productsService from "./products.service.js";

export const findById = async (req, res) => {
  const product = await productsService.findById(req.params.productId);
  res.json({ status: "success", data: product });
};

export const find = async (req, res, next) => {
  const { sortBy, sortDirection = "asc" } = req.query;
  try {
    const products = await productsService.findddddd(sortBy, sortDirection);
    res.json({ status: "success", data: products });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export const findByName = async (req, res) => {
  const product = await productsService.findByName(req.params.productName);
  res.json({ status: "success", data: product });
};

export const save = async (req, res) => {
  const product = req.body;
  const updatedProduct = await productsService.save(product);
  res.json({ status: "success", data: { product: updatedProduct } });
};

export const deleteById = async (req, res) => {
  await productsService.deleteById(req.params.productId);
  res.json({ status: "success" });
};

export const deleteOne = async (req, res) => {
  await productsService.deleteOne(req.params.productId);
  res.json({ status: "success" });
};

export const sortProducts = async (req, res) => {
  logger.info(req.query);
  const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
  const sortedProducts = await productsService.sortProducts(
    req.query.sortBy,
    sortDirection
  );
  res.json({ status: "success", data: sortedProducts });
};

export const saveFromExcel = async (req, res) => {
  const data = await productsService.saveFromExcel(req.file.path);
  res.json({
    status: "success",
    message: "All product added successfully",
    data: data,
  });
};
