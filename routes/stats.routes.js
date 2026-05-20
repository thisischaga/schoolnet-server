const express = require('express');
const router = express.Router();
const { getDashboardStats, getPublicStats } = require('../controllers/stats.controller');
const protect = require('../middleware/auth.middleware');

router.get('/dashboard', protect, getDashboardStats);
router.get('/public', getPublicStats);

module.exports = router;
