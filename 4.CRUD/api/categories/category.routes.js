import express from "express";
import { createCategory, findByName } from "./category.controller.js";

export const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory);
categoryRouter.get("/findByName", findByName);
