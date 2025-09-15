
const express = require('express')
const router = express.Router()
const {getContact, postContact} = require('../controllers/contactController')
const {postUser, login, getAll, getSingle, deleteUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require("../utils/upload")

router.get('/contact', getContact).post('/post-contact', postContact).post('/post-user', upload.single("profilePicture"), postUser).post('/login', login).get('/all-users', protect, getAll).get("/get-single/:id", protect, getSingle).delete("/delete/:id", protect, deleteUser)

module.exports = router
