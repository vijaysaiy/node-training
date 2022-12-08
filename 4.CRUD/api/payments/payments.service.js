import dotenv from "dotenv";
import Razorpay from "razorpay";
import { paymentComplete } from "../order/order.service.js";
import { logger } from "../utils/logger/logger.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const verify = async ({
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature,
}) => {
  const isValid = Razorpay.validateWebhookSignature(
    razorpay_order_id + "|" + razorpay_payment_id,
    razorpay_signature,
    process.env.RAZORPAY_SECRET
  );
  paymentComplete(isValid, razorpay_order_id, razorpay_payment_id);
};

export const createPaymentOrder = async (orderId, amount) => {
  logger.warn(amount * 100);
  return razorpay.orders.create({
    amount: parseInt(amount * 100), // convert rupee to paisa as razorpay accept only paisa
    currency: "INR",
    receipt: orderId,
  });
};
