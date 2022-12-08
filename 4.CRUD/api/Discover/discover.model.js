import mongoose from "mongoose";

export const Discover = mongoose.model(
  "Discover",
  new mongoose.Schema({
    title: {
      type: String,
    },
    image: {
      type: String,
    },
    buttonText: {
      type: String,
    },
  })
);
