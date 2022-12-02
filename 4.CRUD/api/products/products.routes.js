import express from "express";

import {
  deleteById,
  deleteOne,
  find,
  findById,
  findByName,
  save,
} from "./products.controller.js";
import {
  getProductsValidator,
  productValidator,
} from "./products.requestValidators.js";

export const productRouter = express.Router();

productRouter.get("/", getProductsValidator, find);
productRouter.get("/:productId", findById);
productRouter.get("/findByName/:productName", findByName);
productRouter.post("/", productValidator, save);
productRouter.delete("/:productId", deleteById);
productRouter.delete("/delete/:productId", deleteOne);
