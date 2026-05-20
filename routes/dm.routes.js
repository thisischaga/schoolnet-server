const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { validateFields } = require('../middleware/validation.middleware');
const {
  getConversations,
  getMessages,
  sendMessage,
} = require('../controllers/dm.controller');

router.get('/conversations', protect, getConversations);
router.get('/:conversationId', protect, getMessages);
router.post('/send', protect, validateFields(['receiverId', 'text']), sendMessage);

module.exports = router;
