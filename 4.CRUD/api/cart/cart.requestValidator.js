import joiValidator from "express-joi-validation";
import joi from "joi";

const validator = joiValidator.createValidator({ passError: true });

export const saveCartValidator = validator.body(
  joi.object({
    user: joi.string().required(),
    cartItems: joi
      .array()
      .items(
        joi.object({
          product: joi.string(),
          quantity: joi.number().strict().required().min(1),
        })
      ),
  })
);
