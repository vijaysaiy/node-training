import express from "express";
import { verifyToken } from "../utils/authenticate.js";
import { createOrder } from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/create/:user", verifyToken, createOrder);
