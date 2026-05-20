const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { 
    type: String, 
    enum: ['primaire', 'collège', 'lycée', 'université', 'pro'], 
    default: 'université' 
  },
  faculty: { type: String, default: null },
  major: { type: String, default: null },
  role: { type: String, enum: ['student', 'prof', 'admin'], default: 'student' },
  xp: { type: Number, default: 0 },
  // School enrollment — user joins exactly ONE school
  schoolId: { type: String, default: null },
  schoolName: { type: String, default: null },
  subscriptionActive: { type: Boolean, default: false },
  // Friends system
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  history: [{
    question: String,
    answer: String,
    date: { type: Date, default: Date.now }
  }],
  progress: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    score: Number,
    completed: { type: Boolean, default: false }
  }]
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
