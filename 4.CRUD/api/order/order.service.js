import * as cartService from "../cart/cart.service.js";
import { Order } from "./order.model.js";

export const createOrder = async (user) => {
  const cart = await cartService.findByUserId(user);

  const totalAmount = cart.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const newOrder = new Order({ user, orderItems: cart.cartItems, totalAmount });
  return await newOrder.save();
};
