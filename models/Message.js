const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  schoolId: { type: String, required: true },
  channelId: { type: String, required: true, default: 'general' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'prof', 'admin'], default: 'student' },
  avatar: { type: String, default: '😊' },
  text: { type: String, required: true },
  schoolColor: { type: String, default: '#ef4444' }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
