import express from "express";
import { findByUserId, saveCart } from "./cart.controller.js";
import { saveCartValidator } from "./cart.requestValidator.js";

export const cartRouter = express.Router();

cartRouter.post("/createCart", saveCartValidator, saveCart);
cartRouter.get("/getCart/:user", findByUserId);
