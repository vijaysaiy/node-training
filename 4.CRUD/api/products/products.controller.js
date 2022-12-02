import { logger } from "../utils/logger/logger.js";
import * as productsService from "./products.service.js";

export const findById = async (req, res) => {
  const product = await productsService.findById(req.params.productId);
  res.json({ status: "success", data: product });
};

export const find = async (req, res) => {
  const { sortBy, sortDirection = "asc" } = req.query;
  const products = await productsService.find(sortBy, sortDirection);
  res.json({ status: "success", data: products });
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
