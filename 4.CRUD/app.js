import dotenv from "dotenv";
import express from "express";
import { bestSellingRouter } from "./api/BestSelling/bestSelling.routes.js";
import { cartRouter } from "./api/cart/cart.routes.js";
import { categoryRouter } from "./api/categories/category.routes.js";
import { discoverRouter } from "./api/Discover/discover.routes.js";
import { filesRouter } from "./api/files/files.routes.js";
import { orderRouter } from "./api/order/order.routes.js";
import { paymentRouter } from "./api/payments/payments.routes.js";
import { productRouter } from "./api/products/products.routes.js";
import { userRouter } from "./api/user/user.routes.js";
import { httpLogger } from "./api/utils/logger/httpLogger.js";
import { logger } from "./api/utils/logger/logger.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const main = async () => {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(httpLogger);
  app.set("view engine", "ejs");

  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/files", filesRouter);
  app.use("/api/auth", userRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/discover", discoverRouter);
  app.use("/api/bestSelling", bestSellingRouter);

  app.listen(process.env.PORT || 4000, () =>
    logger.info(`Server is up and running at Port ${process.env.PORT || 4000}`)
  );
};

main();
