

const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/userRoute')

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000
})
.then(() => console.log('Database connected!!'))
.catch((err) => console.error(err))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(userRoute)

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

