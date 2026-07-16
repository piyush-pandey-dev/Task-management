import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUserService = async ({ name, email, password }) => {
    
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw { status: 400, message: "User already exists" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate tokenK
  const token = generateToken(user._id);

  return { user, token };
};

export const loginUserService = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw { status: 401, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 401, message: "Invalid email or password" };
  }

  const token = generateToken(user._id);

  return { user, token };
};