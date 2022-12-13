import express from "express";
import { authenticateUsingSession } from "../utils/authenticate.js";
import { upload } from "../utils/upload.js";

import {
  deleteById,
  deleteOne,
  find,
  findById,
  findByName,
  save,
  saveFromExcel,
} from "./products.controller.js";
import {
  addProductValidator,
  getProductsValidator,
} from "./products.requestValidators.js";

export const productRouter = express.Router();

productRouter.get("/", getProductsValidator, find);
productRouter.get("/:productId", findById);
productRouter.get("/findByName/:productName",authenticateUsingSession, findByName);
productRouter.post("/", addProductValidator, save);
productRouter.delete("/:productId", deleteById);
productRouter.delete("/delete/:productId", deleteOne);
productRouter.post("/saveFromExcel",upload.single("file"), saveFromExcel);
