import { Cart } from "./cart.model.js";

export const save = async (cartItem) => {
  return await Cart.findOneAndUpdate({ user: cartItem.user }, cartItem, {
    upsert: true, // will just update if with same name is present other creates a new
    new: true,
  });
};

export const findByUserId = async (user) => {
  return await Cart.findOne({ user }).populate("cartItems.product");
};
