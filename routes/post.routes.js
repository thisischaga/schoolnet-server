const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/auth.middleware');
const { getPosts, createPost, likePost, commentPost } = require('../controllers/post.controller');

// Storage configuration for uploaded photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/posts'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Format d\'image non supporté. Veuillez envoyer du JPG, PNG, GIF ou WEBP.'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/', protect, getPosts);
router.post('/', protect, upload.single('image'), createPost);
router.post('/:postId/like', protect, likePost);
router.post('/:postId/comment', protect, commentPost);

module.exports = router;
