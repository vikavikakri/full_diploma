const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', registerUser); // /api/register
router.post('/login', loginUser); // /api/login
router.get('/profile', authenticateToken, getProfile); // /api/profile
router.put('/profile', authenticateToken, updateProfile);

module.exports = router;