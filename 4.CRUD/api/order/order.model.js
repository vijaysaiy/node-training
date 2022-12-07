import mongoose from "mongoose";
import { productSchema } from "../products/products.model.js";

export const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      user: String,
      orderItems: [
        {
          product: productSchema,
          quantity: Number,
          price: Number,
        },
      ],
      totalAmount: Number,
      status: {
        type: String,
        enum: [
          "pending_approval",
          "approved",
          "rejected",
          "cancelled",
          "shipped",
          "delivered",
          "payment_pending",
        ],
        default: "pending_approval",
      },
    },
    { timestamps: true }
  )
);
