import express from "express";
import { productRouter } from "./api/products/products.routes.js";
import { connectDB } from "./config/db.js";

const main = async () => {
  connectDB();
  const app = express();
  app.use(express.json());
  app.use("/api/products", productRouter);
  app.listen(3000, () => console.log("Server is up and running at Port 3000"));
};

main();
