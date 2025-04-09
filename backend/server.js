const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./node/routes/auth');
app.use('/api', authRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});