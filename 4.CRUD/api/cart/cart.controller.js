import * as cartServices from "./cart.service.js";

export const saveCart = async (req, res) => {
  const cart = req.body;
  const user = req.user._id
  const newCart = await cartServices.save(cart,user);
  res.json({ status: "success", data: newCart });
};

export const findByUserId = async (req, res) => {
  const user = req.user._id
  const cart = await cartServices.findByUserId(user);
  res.json({ status: "success", data: cart });
};

