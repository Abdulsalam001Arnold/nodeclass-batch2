
const express = require('express')
const router = express.Router()
const {getContact, postContact} = require('../controllers/contactController')
const {postUser, login, getAll} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.get('/contact', getContact).post('/post-contact', postContact).post('/post-user', postUser).post('/login', login).get('/all-users', protect, getAll)

module.exports = router
