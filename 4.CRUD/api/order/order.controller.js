import * as orderServices from "./order.service.js";

export const findById = async (req, res) => {
  const order = await orderServices.findById(req.params.orderId);
  res.json({ status: "success", data: order });
};

export const find = async (req, res) => {
  const products = await orderServices.find();
  res.json({ status: "success", data: products });
};

export const createOrder = async (req, res) => {
  const user = req.user._id;
  try {
    const order = await orderServices.createOrder(user);
    res.json({ status: "success", data: order });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const generatePDF = async (req, res) => {
  const pdf = orderServices.generatePDF();
  res.send(pdf);
};
