import express from "express";
import { login, loginUsingSession, register } from "./user.controller.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "./user.requestValidator.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUserValidator, register);
userRouter.post("/login", loginUserValidator, login);
userRouter.post("/loginUsingSession", loginUserValidator, loginUsingSession);
