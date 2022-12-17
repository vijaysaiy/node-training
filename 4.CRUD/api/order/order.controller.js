import events from "events";
import * as orderServices from "./order.service.js";

const eventEmitter = new events();

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
    eventEmitter.emit("orderCreated",order);
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const generatePDF = async (req, res) => {
  const pdf = await orderServices.generatePDF(req.params.id);
  res.setHeader("Content-type", "application/pdf");
  res.send(pdf);
};

export const generaeInvoiceExcel = async (req, res) => {
  const orderId = req.params.id;
  const file = await orderServices.generaeInvoiceExcel(orderId);
  res.setHeader(
    "Content-Disposition",
    `attachment;filename="Invoice-${orderId}.xlsx`
  );
  res.sendFile(file, { root: "C:\\Users\\TR072\\node-training" });
};
