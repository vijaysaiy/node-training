import express from "express";
import { authenticate } from "../utils/authenticate.js";
import { findByUserId, saveCart } from "./cart.controller.js";
import { saveCartValidator } from "./cart.requestValidator.js";

export const cartRouter = express.Router();

cartRouter.post("/createCart", saveCartValidator, authenticate, saveCart);
cartRouter.get("/getCart", authenticate, findByUserId);
// cartRouter.delete('/delete/:user',verifyToken,deleteCart)
