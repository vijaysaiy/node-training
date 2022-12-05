import * as orderServices from "./order.service.js";

export const createOrder = async (req, res) => {
  console.log(req.params.user);
  const order = await orderServices.createOrder(req.params.user);
  res.json({ status: "success", data: order });
};
