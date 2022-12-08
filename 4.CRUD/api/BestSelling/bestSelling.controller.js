import * as bestSellingServices from "./bestSelling.service.js";

export const getBestSelling = async (req, res) => {
  const orders = await bestSellingServices.getBestSelling();

  res.json({ status: "success", data: orders });
};
