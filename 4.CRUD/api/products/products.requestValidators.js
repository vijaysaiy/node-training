import joiValidator from "express-joi-validation";
import joi from "joi";

const validator = joiValidator.createValidator({ passError: true });

export const addProductValidator = validator.body(
  joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
    description: joi.string().required(),
  })
);

export const getProductsValidator = validator.query(
  joi.object({
    sortBy: joi.string().optional(),
    sortDirection: joi.string().when("sortBy", {
      is: joi.exist(),
      then: joi.valid("asc", "desc"),
      otherwise: joi.forbidden(),
    }),
  })
);
