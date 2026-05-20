const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const { validateFields } = require('../middleware/validation.middleware');
const {
  getSuggestions,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getFriends,
  getRequests,
  removeFriend,
} = require('../controllers/friend.controller');

router.get('/suggestions', protect, getSuggestions);
router.get('/list', protect, getFriends);
router.get('/requests', protect, getRequests);
router.post('/request', protect, validateFields(['targetUserId']), sendRequest);
router.post('/accept', protect, validateFields(['fromUserId']), acceptRequest);
router.post('/reject', protect, validateFields(['fromUserId']), rejectRequest);
router.delete('/:friendId', protect, removeFriend);

module.exports = router;
