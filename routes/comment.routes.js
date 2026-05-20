const express = require('express');
const router = express.Router();
const {
  getComments,
  createComment,
  toggleLike,
  deleteComment,
} = require('../controllers/comment.controller');
const protect = require('../middleware/auth.middleware');

// Public: get comments for a course
router.get('/course/:courseId', getComments);

// Protected: create, like, delete
router.post('/course/:courseId', protect, createComment);
router.put('/:commentId/like', protect, toggleLike);
router.delete('/:commentId', protect, deleteComment);

module.exports = router;
