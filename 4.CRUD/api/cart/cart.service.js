import { Cart } from "./cart.model.js";

export const save = async (cart, user) => {
  return await Cart.findOneAndUpdate({ user }, cart, {
    upsert: true, // will just update if with same name is present other creates a new
    new: true,
  });
};

export const findByUserId = async (user) => {
  return await Cart.findOne({ user }).populate("cartItems.product");
};

export const clearCartByUserId = async (user) => {
  return await Cart.deleteOne({ user });
};
