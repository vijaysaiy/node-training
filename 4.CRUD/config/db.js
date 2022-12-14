import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import { logger } from "../api/utils/logger/logger.js";
dotenv.config();

export const sequelize = new Sequelize(process.env.MYSQL_URI);

export const connectDB = async () => {
  logger.info("Connecting to MongoDB");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
  }
};

export const connectSQL = async () => {
  logger.info("Connecting to MySQL..");
  try {
    await sequelize.authenticate();
    logger.info("Connected to MySQL");
  } catch (error) {
    logger.error("Failed to connect to MySQL", error);
  }
};
