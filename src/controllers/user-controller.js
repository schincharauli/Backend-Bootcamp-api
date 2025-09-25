import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const newUser = new User({ name, email, age });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "error creating user" });
  }
};
