import { Discover } from "./discover.model.js";

export const create = async (details) => {
  await Discover.updateMany({}, { $set: { isActive: 0 } });

  return await Discover.create({ details });
};
