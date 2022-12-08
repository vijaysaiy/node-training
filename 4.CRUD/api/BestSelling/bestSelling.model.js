import mongoose from "mongoose";

export const BestSelling = new mongoose.model(
  "BestSelling",
  new mongoose.Schema({
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    },
  })
);
