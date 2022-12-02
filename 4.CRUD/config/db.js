import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../api/utils/logger/logger.js";

dotenv.config();

export const connectDB = () => {
  logger.info("Connecting to MongoDB");
  try {
    mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.info("Failed to connect to MongoDB", error);
  }
};
