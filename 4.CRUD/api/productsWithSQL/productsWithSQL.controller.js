import * as productService from "./productswithSQL.services.js";

export const find = async (req, res) => {
  const { sortBy, sortDirection = "asc" } = req.query;

  try {
    const products = await productService.find(sortBy, sortDirection);
    res.json({ status: "success", data: products });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

export const save = async (req, res) => {
  try {
    const product = await productService.save(req.body);
    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

export const findById = async (req, res) => {
  try {
    const product = await productService.findById(req.params.id);
    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};

export const findByName = async (req, res) => {
  try {
    const product = await productService.findByName(req.params.name);
    res.json({ status: "success", data: product });
  } catch (error) {
    res.json({ status: "failure", message: error.message });
  }
};
