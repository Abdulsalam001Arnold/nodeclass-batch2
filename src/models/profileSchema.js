
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    bio: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true 
    }
  });

const profileModel = mongoose.model("Profile", profileSchema)

module.exports = {profileModel}