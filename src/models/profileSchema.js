
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    bio: { type: String },
    profilePicture: {
      type: String,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true 
    }
  });

const profileModel = mongoose.model("Profile", profileSchema)

module.exports = {profileModel}