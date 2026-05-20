const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { askText, askVoice, generateAudio } = require('../controllers/ai.controller');
const protect = require('../middleware/auth.middleware');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `voice_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

router.use(protect); // All AI routes protected

router.post('/ask-text', askText);
router.post('/ask-voice', upload.single('audio'), askVoice);
router.post('/tts', generateAudio);

module.exports = router;
