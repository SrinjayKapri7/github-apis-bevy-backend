const express = require('express');
const cors = require('cors');
const repoRoutes = require('./routes/repoRoutes');
require('dotenv').config();
require('./config/db'); // Database connection setup

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', repoRoutes);

module.exports = app;
