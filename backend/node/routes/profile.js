const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', authenticateToken, getProfile);
router.put('/', authenticateToken, updateProfile);

module.exports = router;