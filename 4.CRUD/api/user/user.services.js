import { User } from "./user.model.js";

export const save = async (userData) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("User already Exists");
    } else {
      throw error;
    }
  }
};

export const find = async (userData) => {
  const user = await User.findOne({
    email: userData.email,
    password: userData.password,
  });
  return user;
};
