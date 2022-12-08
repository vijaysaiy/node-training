import { find as findOrders } from "../order/order.service.js";

export const getBestSelling = async () => {
  return await findOrders();
};
