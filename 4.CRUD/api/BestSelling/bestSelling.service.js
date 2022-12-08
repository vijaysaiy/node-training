import { find as findOrders } from "../order/order.service.js";

const sort = (obj) => {
  const order = [];
  const res = {};
  Object.keys(obj).forEach((key) => {
    return (order[obj[key]["quantity"] - 1] = key);
  });
  order.reverse().forEach((key) => {
    res[key] = obj[key];
  });
  return res;
};

export const getBestSelling = async () => {
  const orders = await findOrders();
  const orderItems = orders.map((order) => order.orderItems);

  let list = {};

  const getList = (products) => {
    const indi = []; //to build array of individual products
    for (const item of products) {
      for (const product of item) {
        indi.push(product);
      }
    }
    indi.forEach((item) => {
      if (list.hasOwnProperty(item?.product?.name)) {
        list[item.product.name] = {
          ...list[item.product.name],
          quantity: list[item.product.name].quantity + item.quantity,
        };
      } else {
        list[item.product.name] = {
          quantity: item.quantity,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
        };
      }
    });
    return list;
  };

  return sort(getList(orderItems));
};
