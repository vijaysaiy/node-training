import * as userServices from "./user.services.js";

export const save = async (req, res) => {
  try {
    const newUser = await userServices.save(req.body);
    res.json({ status: "success", data: newUser });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const find = async (req, res) => {
  const user = await userServices.find(req.body);
  if (!user)
    return res.json({
      status: "failed",
      message: "User doesn't exists/ invalid credentials",
    });
  res.json({ status: "success", data: user });
};
