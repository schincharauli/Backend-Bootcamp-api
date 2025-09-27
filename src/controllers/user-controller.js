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
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const newUser = new User({ name, email });
    await newUser.save();
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
