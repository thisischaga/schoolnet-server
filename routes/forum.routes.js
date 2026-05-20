const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { getMessages, postMessage, clearForum } = require('../controllers/forum.controller');

router.get('/', protect, getMessages);
router.post('/', protect, postMessage);
router.delete('/', protect, clearForum);

module.exports = router;
