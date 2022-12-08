import express from "express";
import { create, find } from "./discover.controller.js";

export const discoverRouter = express.Router();

discoverRouter.post("/create", create);
discoverRouter.get("/get", find);
