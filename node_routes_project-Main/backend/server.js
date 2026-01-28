// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connect');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/students', studentRoutes); // all CRUD routes under /students
app.get('/ttech', (req, res) => {
  res.send('Your server is running and /ttech route works!');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

