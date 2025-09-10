const { userValidator } = require("../validator/userValidator");
const userModel = require("../models/userSchema");

const postUser = (req, res) => {
  try {
    const { username, email, password } = req.body;

    const { error } = userValidator.validate({ username, email, password });

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const user = userModel.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      reason: "Internal server error",
    });
  }
};

module.exports = { postUser }
