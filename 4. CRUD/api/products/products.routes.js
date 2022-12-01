import express from "express";
import {
  deleteById,
  deleteOne,
  find,
  findById,
  findByName,
  save,
} from "./products.controller.js";

export const productRouter = express.Router();

productRouter.get("/", find);
productRouter.get("/:productId", findById);
productRouter.get("/findByName/:productName", findByName);
productRouter.post("/", save);
productRouter.delete("/:productId", deleteById);
productRouter.delete("/delete/:productId", deleteOne);
