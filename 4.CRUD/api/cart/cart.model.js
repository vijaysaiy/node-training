import mongoose from "mongoose";

export const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema(
    {
      user: {
        type: String,
      },
      cartItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    { timestamps: true }
  )
);
