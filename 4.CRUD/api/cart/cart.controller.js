import * as cartServices from "./cart.service.js";

export const saveCart = async (req, res) => {
  const cart = req.body;
  const user = req.user._id;
  try {
    const newCart = await cartServices.save(cart, user);
    res.json({ status: "success", data: newCart });
  } catch (error) {
    res.send({ status: "failed", message: error.message });
  }
};

export const findByUserId = async (req, res) => {
  const user = req.user._id;
  const cart = await cartServices.findByUserId(user);
  res.json({ status: "success", data: cart });
};
