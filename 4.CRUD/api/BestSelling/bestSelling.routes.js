import express from "express";
import { getBestSelling } from "./bestSelling.controller.js";

export const bestSellingRouter = express.Router();

bestSellingRouter.get("/getBestSelling", getBestSelling);
