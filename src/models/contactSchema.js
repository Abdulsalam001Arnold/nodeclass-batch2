
const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    }
},

{timestamps: true}
)

const contactModel = mongoose.model('contacts', contactSchema)

module.exports = contactModel