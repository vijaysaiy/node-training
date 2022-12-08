import express from "express";
import { create } from "./discover.controller.js";

export const discoverRouter = express.Router();

discoverRouter.post("/create", create);
