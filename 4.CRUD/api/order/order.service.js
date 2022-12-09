import { jsPDF } from "jspdf";
import * as cartService from "../cart/cart.service.js";
import { createPaymentOrder } from "../payments/payments.service.js";
import { Order } from "./order.model.js";

export const generatePDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(24);
  doc.text("Invoice", 15, 20);
  return Buffer.from(doc.output("arraybuffer"));
};

export const findById = async (id) => {
  return await Order.findById(id).populate("orderItems.product");
};

export const find = async () => {
  return await Order.find();
};
export const findOrders = async () => {
  return await Order.find().select("orderItems -_id");
};

export const createOrder = async (user) => {
  const cart = await cartService.findByUserId(user);

  if (!cart?.cartItems?.length) {
    throw new Error("Cart should not be empty");
  }

  const totalAmount =
    Math.round(
      cart.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) * 100
    ) / 100;

  try {
    const newOrder = new Order({
      user,
      orderItems: cart.cartItems,
      totalAmount,
    });
    await newOrder.save();
    await cartService.clearCartByUserId(user);

    const paymentOrder = await createPaymentOrder(newOrder._id, totalAmount);
    newOrder.status = "payment_pending";
    newOrder.paymentOrderId = paymentOrder.id;
    await newOrder.save();

    return {
      orderId: newOrder._id,
      totalAmount,
      currency: "INR",
      paymentOrderId: paymentOrder.id,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const paymentComplete = async (isValid, paymentOrderId, paymentId) => {
  if (!isValid) {
    await Order.findOneAndUpdate(
      {
        paymentOrderId,
      },
      {
        status: "payment_failed",
        paymentId,
      }
    );
    throw new Error("Invalid Payment");
  } else {
    await Order.findOneAndUpdate(
      {
        paymentOrderId,
      },
      {
        status: "payment_success",
        paymentId,
      },
      {
        new: true,
      }
    );
  }
};
