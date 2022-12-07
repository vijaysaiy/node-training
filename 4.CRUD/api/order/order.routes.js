import express from "express";
import { authenticate } from "../utils/authenticate.js";
import { createOrder, find, findById } from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/create/", authenticate, createOrder);
orderRouter.get("/getById/:orderId", authenticate, findById);
orderRouter.get("/list", authenticate, find);
