import * as userServices from "./user.services.js";

export const register = async (req, res) => {
  try {
    const newUser = await userServices.register(req.body);
    res.json({ status: "success", data: newUser });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userServices.login(req.body);
    res.json({ status: "success", data: user });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const loginUsingSession = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.loginUsingSession(email, password);

  req.session.user = user;
  res.send({ status: "success", data: user });
};

export const logoutUsingSession = async (req, res) => {
  req.session.destroy(() => {
    res.send({ status: "success" });
  });
};

export const currentUser = async (req, res) => {
  res.send({ status: "success", data: req.session.user });
};
