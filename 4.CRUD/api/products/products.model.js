import mongoose from "mongoose";

export const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      image: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);
