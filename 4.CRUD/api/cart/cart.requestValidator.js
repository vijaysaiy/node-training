import joiValidator from "express-joi-validation";
import joi from "joi";

const validator = joiValidator.createValidator({ passError: false });

export const saveCartValidator = validator.body(
  joi.object({
    cartItems: joi.array().items(
      joi.object({
        product: joi.string(),
        quantity: joi.number().strict().required().min(1),
      })
    ),
  })
);
