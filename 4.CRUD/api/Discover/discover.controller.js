import * as discoverService from "./discover.service.js";

export const create = async (req, res) => {
  const newDiscover = await discoverService.create(req.body);
  res.json({ status: "success", data: newDiscover });
};

export const find = async (req, res) => {
  const page = await discoverService.find();
  res.json({ status: "success", data: page });
};
