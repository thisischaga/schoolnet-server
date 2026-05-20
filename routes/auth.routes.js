const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, enrollSchool } = require('../controllers/auth.controller');
const protect = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/enroll', protect, enrollSchool);

module.exports = router;
