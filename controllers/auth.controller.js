const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'your_super_secret_key', { expiresIn: '30d' });

const formatUser = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  level: user.level,
  faculty: user.faculty,
  major: user.major,
  schoolId: user.schoolId,
  schoolName: user.schoolName,
  subscriptionActive: user.subscriptionActive,
  ...(token && { token }),
});

exports.register = async (req, res) => {
  try {
    const { name, email, password, schoolId, schoolName, level } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Cet email est déjà utilisé.' });

    const user = await User.create({ name, email, password, schoolId, schoolName, level: level || 'université' });
    res.status(201).json(formatUser(user, generateToken(user._id)));
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json(formatUser(user, generateToken(user._id)));
    } else {
      res.status(401).json({ message: 'Email ou mot de passe invalide.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, level, faculty, major, schoolId, schoolName } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    if (name) user.name = name;
    if (level) user.level = level;
    if (faculty !== undefined) user.faculty = faculty;
    if (major !== undefined) user.major = major;
    if (schoolId !== undefined) user.schoolId = schoolId;
    if (schoolName !== undefined) user.schoolName = schoolName;

    const updated = await user.save();
    res.json(formatUser(updated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New: Enroll user into a school (can only change if not already enrolled)
exports.enrollSchool = async (req, res) => {
  try {
    const { schoolId, schoolName, level } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    user.schoolId = schoolId;
    user.schoolName = schoolName;
    if (level) user.level = level;

    const updated = await user.save();
    res.json(formatUser(updated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
