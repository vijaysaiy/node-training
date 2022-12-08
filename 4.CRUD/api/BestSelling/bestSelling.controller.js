import * as bestSellingServices from "./bestSelling.service.js";

export const getBestSelling = async (req, res) => {
  const orders = await bestSellingServices.getBestSelling();
  //   const best = orders.map((order) => {
  //     let products = {};
  //     order.orderItems.forEach((product) => {
  //       products[product.name] = {
  //         price: product.price,
  //         image: product.image,
  //         quantity: product.qty,
  //       };
  //     });
  const best = orders.map((order) => order.orderItems[0]);

  res.json({ status: "success", data: best });
};
