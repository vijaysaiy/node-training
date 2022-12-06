import express from "express";
import { find, save } from "./user.controller.js";
import {
  findUserValidator,
  saveUserValidator,
} from "./user.requestValidator.js";

export const userRouter = express.Router();

userRouter.post("/register", saveUserValidator, save);
userRouter.post("/login", findUserValidator, find);
