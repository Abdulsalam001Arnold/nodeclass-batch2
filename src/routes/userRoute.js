
const express = require('express')
const router = express.Router()
const {getHome, getAbout, getContact, postContact} = require('../controllers/userController')

router.get('/', getHome).get('/about', getAbout).get('/contact', getContact).post('/post-contact', postContact)

module.exports = router
