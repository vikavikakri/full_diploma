const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getProgress, updateProgress } = require('../controllers/progressController');

router.get('/progress', authenticateToken, getProgress);
router.post('/progress', authenticateToken, updateProgress);

module.exports = router;