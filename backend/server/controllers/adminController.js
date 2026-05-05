import User from "../models/User.js";

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// UPDATE user role
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["buyer", "seller", "agent", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated", user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};