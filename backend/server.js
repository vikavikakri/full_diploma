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
const profileRoutes = require('./node/routes/profile');
const progressRoutes = require('./node/routes/progress');
const achievementsRoutes = require('./node/routes/achievements');

app.use('/api', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', progressRoutes);
app.use('/api', achievementsRoutes); // Добавляем маршруты ачивок

// Server start
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});