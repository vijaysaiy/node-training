import * as productsService from "./products.service.js";

export const findById = async (req, res) => {
  const product = await productsService.findById(req.params.productId);
  res.json({ status: "success", data: product });
};

export const find = async (req, res) => {
  const products = await productsService.find();
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
  console.log("delete by id");

  await productsService.deleteById(req.params.productId);
  res.json({ status: "success" });
};
export const deleteOne = async (req, res) => {
  console.log("delete one");
  await productsService.deleteOne(req.params.productId);
  res.json({ status: "success" });
};
