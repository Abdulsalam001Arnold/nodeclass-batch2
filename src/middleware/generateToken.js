const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    if (!userId) throw new Error("User ID is not provided");

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { generateToken }
