
const Joi = require('joi')

const contactValidator = Joi.object({
    fullName: Joi.string().optional().allow('').min(3).max(40),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().optional().allow('').min(10).max(15),
    message: Joi.string().required().min(6).max(100)
})

module.exports = {contactValidator}