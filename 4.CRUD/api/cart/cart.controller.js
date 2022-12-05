import * as cartServices from "./cart.service.js";

export const saveCart = async (req, res) => {
  const newCart = await cartServices.save(req.body);
  res.json({ status: "success", data: newCart });
};

export const findByUserId = async (req, res) => {
  const cart = await cartServices.findByUserId(req.params.user);
  res.json({ status: "success", data: cart });
};
