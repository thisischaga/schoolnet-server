const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['primaire', 'collège', 'lycée', 'université', 'pro'], 
    required: true 
  },
  faculty: { type: String, default: null }, // e.g. "FASEG"
  major: { type: String, default: null },   // e.g. "APE", "CCA"
  semester: { type: Number, default: null }, // e.g. 1, 2, 3, 4, 5, 6
  code: { type: String, default: null },    // e.g. "ECO101C"
  content: { type: String, required: true }, 
  duration: String, 
  chapters: [{
    title: String,
    content: String,
    duration: String
  }],
  videoUrl: String,
  quiz: [{
    question: String,
    options: [String],
    correctAnswer: String
  }],
  knowledgeBase: { type: String, default: "" } // Technical text for the AI to "learn" from
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
