// backend/node/routes/achievements.js
const express = require('express');
const router = express.Router();
const achievementsController = require('../controllers/achievementsController');

// Маршруты
router.get('/achievements', achievementsController.getAchievements);
router.post('/check-achievements', achievementsController.checkAchievements);
router.get('/user-achievements', achievementsController.getUserAchievements);

module.exports = router;