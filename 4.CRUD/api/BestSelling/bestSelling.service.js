import { Order } from "../order/order.model.js";
import { findOrders } from "../order/order.service.js";

const sort = (obj) => {
  const order = [];
  const res = {};
  Object.keys(obj).forEach((key) => {
    return (order[obj[key]["quantitySold"] - 1] = key);
  });
  order.reverse().forEach((key) => {
    res[key] = obj[key];
  });
  return res;
};

export const getBestSelling = async () => {
  const orders = await findOrders();

  const orderItems = [].concat.apply(
    [],
    orders.map((order) => order.orderItems)
  ); // to flatten array of array of objects to array of objects

  let list = {};

  const getList = (products) => {
    products.forEach((item) => {
      if (list.hasOwnProperty(item?.product?.name)) {
        list[item.product.name] = {
          ...list[item.product.name],
          quantitySold: list[item.product.name].quantitySold + item.quantity,
        };
      } else {
        list[item.product.name] = {
          quantitySold: item.quantity,
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

export const getBestSellingUsingAggregation = async () => {
  const orders = await Order.aggregate([
    {
      $match: {
        status: "payment_pending",
      },
    },
    {
      $unwind: {
        path: "$orderItems",
      },
    },
    {
      $group: {
        _id: "$orderItems.product._id",
        totalQuantitiesSold: {
          $sum: "$orderItems.quantity",
        },
      },
    },
    {
      $sort: {
        totalQuantitiesSold: -1,
      },
    },
    {
      $limit: 4,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $project: {
        name: "$product.name",
        image: "$product.image",
        price: "$product.price",
        totalQuantitiesSold: 1,
      },
    },
  ]);
  return orders;
};
