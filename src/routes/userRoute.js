
const express = require('express')
const router = express.Router()
const {getContact, postContact} = require('../controllers/contactController')
const {postUser} = require('../controllers/userController')

router.get('/contact', getContact).post('/post-contact', postContact).post('/post-user', postUser)

module.exports = router
