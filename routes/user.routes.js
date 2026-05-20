const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { searchUsers, getProfile } = require('../controllers/user.controller');

router.get('/search', protect, searchUsers);
router.get('/profile', protect, getProfile);

module.exports = router;
