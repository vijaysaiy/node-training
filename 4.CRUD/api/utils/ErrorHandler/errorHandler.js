import { logger } from "../logger/logger.js";

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  if (err.error?.isJoi) {
    logger.error(err.error.message);
    return res.status(400).json({
      status: "validation error",
      message: err.error.message,
    });
  }

  res.status(500).json({
    status: "failure",
    message: "Internal Server error",
  });
};
