import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = () => {
  console.log("Connecting to MongoDB");
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};
