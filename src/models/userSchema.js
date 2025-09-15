const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isMatch: "/.+@.+..+/",
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 15,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
        return next();

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
})

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
