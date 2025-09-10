
const contactModel = require('../models/contactSchema')
const {contactValidator} = require('../validator/contactValidator')




const getContact = (req, res) => {
    res.send('Contact me')
}

const postContact = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, message } = req.body;
      const { error } = contactValidator.validate({
        fullName,
        email,
        phoneNumber,
        message,
      });
  
      if (error) {

        return res.status(400).json({ error: error.details[0].message });
      }
      if (!email || !message) {
        return res.status(400).json({ error: "Email and message are required" });
      }
      const contact = await contactModel.create({
        fullName,
        email,
        phoneNumber,
        message,
      });
  
      return res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error!!" });
    }
  };

module.exports = { getContact, postContact }