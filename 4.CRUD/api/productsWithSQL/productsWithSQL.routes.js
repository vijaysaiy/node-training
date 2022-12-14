import express from "express";
import {
  addProductValidator,
  getProductsValidator,
} from "../products/products.requestValidators.js";
import { find, findById, findByName, save } from "./productsWithSQL.controller.js";

export const productswithSQLRouter = express.Router();

productswithSQLRouter.get("/getProducts", getProductsValidator, find);
productswithSQLRouter.post("/saveproduct", addProductValidator, save);
productswithSQLRouter.get("/findById/:id", findById);
productswithSQLRouter.get("/findByName/:name", findByName);
