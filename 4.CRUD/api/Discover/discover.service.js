import { Discover } from "./discover.model.js";

export const create = async (details) => {
  console.log(details);
  await Discover.updateMany({}, { $set: { isActive: 0 } }); // will set active status to 0 for all existing pages

  return await Discover.create({ ...details, isActive: 1 }); // creates a new one
};

export const find = async () => {
  return await Discover.find({ isActive: 1 });
};
