const aiService = require('../services/ai.service');
const User = require('../models/User');
const Course = require('../models/Course');

exports.askText = async (req, res) => {
  try {
    const { prompt, courseId } = req.body;
    console.log(`AI Request from user ${req.userId} (Course: ${courseId}): ${prompt}`);
    
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let courseContext = null;
    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        // Use knowledgeBase as primary training data, fallback to chapters content
        courseContext = course.knowledgeBase || course.chapters.map(ch => ch.content).join("\n");
      }
    }

    const answer = await aiService.askAI(prompt, user.level, courseContext);
    
    // Save to history
    user.history.push({ question: prompt, answer });
    await user.save();

    res.json({ answer });
  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.askVoice = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "No audio file provided" });
    }

    const audioPath = req.file.path;
    const user = await User.findById(req.userId);

    let courseContext = null;
    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        courseContext = course.knowledgeBase || course.chapters.map(ch => ch.content).join("\n");
      }
    }

    // 1. Audio -> Text
    const transcribedText = await aiService.speechToText(audioPath);

    // 2. Text -> AI Response
    const aiResponseText = await aiService.askAI(transcribedText, user.level, courseContext);

    // 3. AI Response -> Audio
    const responseAudioFile = await aiService.textToSpeech(aiResponseText);

    // Save history
    user.history.push({ question: transcribedText, answer: aiResponseText });
    await user.save();

    res.json({
      question: transcribedText,
      answer: aiResponseText,
      audioUrl: `/uploads/${responseAudioFile}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.generateAudio = async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text) return res.status(400).json({ message: "Text required" });
    
    const fileName = await aiService.textToSpeech(text, voice);
    res.json({ audioUrl: `/uploads/${fileName}` });
  } catch (error) {
    console.error('TTS Controller Error:', error);
    res.status(500).json({ message: error.message });
  }
};
