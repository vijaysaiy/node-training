import fs from "fs";
import { jsPDF } from "jspdf";
import jsAutoTable from "jspdf-autotable";
import XLSX from "xlsx-js-style";
import * as cartService from "../cart/cart.service.js";
import { createPaymentOrder } from "../payments/payments.service.js";
import { logger } from "../utils/logger/logger.js";
import { Order } from "./order.model.js";

export const generaeInvoiceExcel = async (orderId) => {
  logger.info("Generating Excel");
  const order = await Order.findById(orderId);
  const title = [
    {
      v: "Invoice",
      t: "s",
      s: {
        font: { bold: true, sz: 24 },
      },
    },
  ];
  const header = ["Product", "Quantity", "Rate", "Amount"];
  const rows = order.orderItems.map((order) => [
    order.product.name,
    order.quantity,
    parseFloat(order.product.price).toFixed(2),
    parseFloat(order.quantity * order.product.price).toFixed(2),
  ]);

  const data = [title, header, ...rows];
  const workSheet = XLSX.utils.aoa_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
  XLSX.writeFile(workBook, "tmp\\sample.xlsx");
  return "tmp\\sample.xlsx";
};

export const generatePDF = async (id) => {
  const autoTable = jsAutoTable.default;
  const orderDetails = await Order.findOne({ _id: id });

  const rowStyles = {
    fillColor: [255, 255, 255],
    textColor: [0, 0, 0],
    lineWidth: 0.1,
    lineColor: [0, 0, 0],
  };
  const logo = fs
    .readFileSync(
      "C:\\Users\\TR072\\node-training\\4.CRUD\\assets\\mandi_one_logo.jpeg"
    )
    .toString("base64");
  const doc = new jsPDF();
  doc.addImage(logo, "JPEG", 150, 0, 50, 50);
  doc.setFontSize(24);
  doc.text("Invoice", 15, 20);
  doc.setFontSize(18);
  doc.text(`Order ID: ${orderDetails._id}`, 15, 40);
  doc.setFontSize(16);
  // doc.line(30, 30, 100, 30);

  // doc.line(30, 30, 560, 30);

  doc.text(`Total Amount: ${orderDetails.totalAmount}`, 15, 60);

  autoTable(doc, {
    theme: "plain",
    headStyles: rowStyles,
    bodyStyles: rowStyles,
    startY: 80,
    head: [
      [
        { content: "ProductId and Name", colSpan: 2 },
        "Quantity",
        "Rate",
        "Amount",
      ],
    ],
    body: orderDetails.orderItems.map((order) => [
      order.product._id,
      order.product.name,
      order.quantity,
      parseFloat(order.product.price).toFixed(2),
      parseFloat(order.quantity * order.product.price).toFixed(2),
    ]),
  });
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
