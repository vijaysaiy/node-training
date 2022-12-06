import joiValidator from "express-joi-validation";
import joi from "joi";

const validator = joiValidator.createValidator({});

export const saveUserValidator = validator.body(
  joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    mobile: joi.string().required(),
    password: joi.string().required(),
  })
);

export const findUserValidator = validator.body(
  joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  })
);
