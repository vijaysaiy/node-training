import express from "express";
import { createOrder } from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/create/:user", createOrder);
