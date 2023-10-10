const { generateToken } = require("../config/jwt");
const mongoose = require("mongoose");

const User = require("../models/user");

class UserController {
  constructor() {}

  static createUser = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;
    let role = "user";

    const users = await User.find();

    if (users.length < 1) {
      role = "admin";
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        mobile,
        password,
        role,
      });

      res.status(201).json({
        success: true,
        user: newUser,
        message: "User added successfully",
      });
    } else {
      res.status(400).json({ success: false, message: "Email already exists" });
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.isPasswordValid(password))) {
      const token = generateToken(user._id);
      res.json({
        id: user?._id,
        role: user?.role,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobile: user?.mobile,
        token,
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  };

  static getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };

  static getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Malformed id. Please insure that id is valid and try again.",
      });
    }

    const user = await User.findOne({ _id: id });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });

    res.json({
      id: user?._id,
      role: user?.role,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      mobile: user?.mobile,
    });
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Malformed id. Please insure that id is valid and try again.",
      });
    }

    const user = await User.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });

    await User.deleteOne({ _id: id });

    res.json({ success: true, message: "User deleted successfully." });
  };

  static updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, mobile } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Malformed id. Please insure that id is valid and try again.",
      });
    }

    if (req.user.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Only account owner can modify user details.",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { firstName, lastName, email, mobile },
      { new: true }
    );

    res.json({
      id: updatedUser?._id,
      role: updatedUser?.role,
      firstName: updatedUser?.firstName,
      lastName: updatedUser?.lastName,
      email: updatedUser?.email,
      mobile: updatedUser?.mobile,
    });
  };

  static blockUser = async (req, res) => {
    const blockedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isBlocked: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: blockedUser,
      message: "User blocked.",
    });
  };

  static unblockUser = async (req, res) => {
    const unblockedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isBlocked: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: unblockedUser,
      message: "User unblocked.",
    });
  };
}

module.exports = UserController;
