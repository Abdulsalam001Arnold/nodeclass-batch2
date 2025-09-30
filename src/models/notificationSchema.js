

const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    token: {
        type: String
    }
})

const notificationModel = mongoose.model("token", notificationSchema)

module.exports = {notificationModel}