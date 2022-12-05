import dotenv from "dotenv";
import express from "express";
import { cartRouter } from "./api/cart/cart.routes.js";
import { filesRouter } from "./api/files/files.routes.js";
import { orderRouter } from "./api/order/order.routes.js";
import { productRouter } from "./api/products/products.routes.js";
import { httpLogger } from "./api/utils/logger/httpLogger.js";
import { logger } from "./api/utils/logger/logger.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const main = async () => {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use(httpLogger);

  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/files",filesRouter);

  app.listen(process.env.PORT || 4000, () =>
    logger.info(`Server is up and running at Port ${process.env.PORT || 4000}`)
  );
};

main();
