const { userValidator } = require("../validator/userValidator");
const userModel = require("../models/userSchema");
const { profileModel } = require("../models/profileSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/generateToken");
const {cloudUpload} = require("../utils/cloudUpload")
const connectDB = require('../config/db')
const { asyncHandler }  = require("../utils/asyncHandler")

const postUser = asyncHandler(async (req, res) => {

    const { username, email, password, bio } = req.body;

      let profilePictureUrl = ""

      if(req.file) {
        profilePictureUrl = await cloudUpload(req.file.buffer)
      }
    

    const { error } = userValidator.validate({
      username,
      email,
      password,
      bio,
    });

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    const profile = await profileModel.create({
      bio,
      profilePicture: profilePictureUrl,
      user: null,
    });

    const user = await userModel.create({
      username,
      email,
      password,
      profile: profile._id,
    });

    await profileModel.findByIdAndUpdate(profile._id, { user: user._id });

    const populatedUser = await userModel
      .findById(user._id)
      .populate("profile");

    return res.status(201).json({
      message: "User created successfully",
      populatedUser,
      token: generateToken(user._id),
    });
});

const login = async (req, res) => {
  try {
    await connectDB(); // ensures DB is ready

    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email }).populate("profile");

    if (!existingUser)
      return res.status(400).json({ message: "User does not exist, please sign up." });

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    if (!checkPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    return res.status(200).json({
      message: "User logged in",
      existingUser,
      token: generateToken(existingUser._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userModel.find().populate("profile");

    if (!users)
      return res.status(404).json({
        message: "No users found.",
      });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reason: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("profile");
    if (!user)
      return res.status(404).json({
        message: "User not found.",
      });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      reason: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({
        message: "User not found.",
      });

    res.status(200).json({
      message: "User deleted successfully!",
      deletedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      reason: err.message,
    });
  }
};

module.exports = { postUser, login, getAll, getSingle, deleteUser };
