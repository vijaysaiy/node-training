import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { bestSellingRouter } from "./api/BestSelling/bestSelling.routes.js";
import { cartRouter } from "./api/cart/cart.routes.js";
import { categoryRouter } from "./api/categories/category.routes.js";
import { discoverRouter } from "./api/Discover/discover.routes.js";
import { filesRouter } from "./api/files/files.routes.js";
import { orderRouter } from "./api/order/order.routes.js";
import { paymentRouter } from "./api/payments/payments.routes.js";
import { productRouter } from "./api/products/products.routes.js";
import { productswithSQLRouter } from "./api/productsWithSQL/productsWithSQL.routes.js";
import { userRouter } from "./api/user/user.routes.js";
import { errorHandler } from "./api/utils/ErrorHandler/errorHandler.js";
import { httpLogger } from "./api/utils/logger/httpLogger.js";
import { logger } from "./api/utils/logger/logger.js";
import { routeNotFoundHandler } from "./api/utils/RouteNotFoundHandler/routeNotFoundHandler.js";
import { connectDB, connectSQL } from "./config/db.js";

dotenv.config();

const connectTODBS = async () => {
  const mongo = connectDB();
  const sql = connectSQL();
  return Promise.all([mongo, sql]);
};

const main = async () => {
  await connectTODBS();

  const app = express();
  app.use(express.json());

  // FOR RAZOR PAY PAYMENTS
  app.use(express.urlencoded({ extended: true }));

  //TO USE LOGGER (will log requested calls ex GET: /products)
  app.use(httpLogger);

  // VIEW ENGINE TO USE EJS TEMPLATES
  app.set("view engine", "ejs");

  // SESSION MANAGER
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1 * 60 * 60 * 1000,
      },
    })
  );

  // MAIN APIS
  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/files", filesRouter);
  app.use("/api/auth", userRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/discover", discoverRouter);
  app.use("/api/bestSelling", bestSellingRouter);
  app.use("/api/sql/products", productswithSQLRouter);

  //ERROR HANDLING MIDDLEWARES
  app.use(routeNotFoundHandler);
  app.use(errorHandler);

  app.listen(process.env.PORT || 4000, () =>
    logger.info(`Server is up and running at Port ${process.env.PORT || 4000}`)
  );
};

main();
