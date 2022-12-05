import express from "express";
import { upload } from "../utils/upload.js";
import * as filesController from "./files.controller.js";

export const filesRouter = express.Router();

filesRouter.post("/upload", upload.single("file"), filesController.upload);
filesRouter.get("/download/:filename", filesController.download);
