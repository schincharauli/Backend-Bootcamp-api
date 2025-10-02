import { registrationWelcome } from "../mail/index.js";
import User from "../models/user.js";
import bicrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const salt = await bicrypt.genSalt(10);
    const hasshedPassword = await bicrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hasshedPassword });
    await newUser.save();
    await registrationWelcome(email, name);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "error creating user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findOneAndUpdate({ id }, { email }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error updating user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error updating user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await bicrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("token", token);
    return res.status(200).json({ message: "login successful", user, token });
  } catch (error) {}
};
