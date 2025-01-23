const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// dotenv.config();
dotenv.config({ path: './.env' });
// require('dotenv').config();
require('./db/conn');

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Use combined user and table booking routes
app.use(require('./router/user'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
