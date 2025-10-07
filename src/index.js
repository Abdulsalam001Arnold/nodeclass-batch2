const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const userRoute = require('./routes/userRoute');

dotenv.config();

const app = express();

// connect to DB once at startup
connectDB();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;
