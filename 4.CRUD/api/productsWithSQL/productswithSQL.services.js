import { Op } from "sequelize";
import { Product } from "./productswithSQL.model.js";

export const find = async (sortByField, sortDirection) => {
  if (sortByField) {
    return await Product.findAll({
      order: [[sortByField, sortDirection]],
    });
  }
  return await Product.findAll();
};

export const save = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

export const findById = async (id) => {
  return await Product.findByPk(id);
};

export const findByName = async (name) => {
  return await Product.findAll({ where: { name: { [Op.like]: `${name}%` } } });
};
