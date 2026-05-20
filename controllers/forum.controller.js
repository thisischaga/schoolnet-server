const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    const { schoolId, channelId } = req.query;
    
    if (!schoolId) {
      return res.status(400).json({ message: 'L\'ID de l\'école est requis.' });
    }

    const query = { schoolId };
    if (channelId) query.channelId = channelId;

    const messages = await Message.find(query).sort({ createdAt: 1 }).limit(100);
    
    // Format the messages for the frontend expected output
    const formattedMessages = messages.map(msg => ({
      id: msg._id,
      user: msg.name,
      avatar: msg.avatar,
      text: msg.text,
      date: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: msg.role,
      schoolColor: msg.schoolColor,
      isMe: req.userId === msg.user.toString() // We compare with the logged user ID
    }));

    res.json(formattedMessages);
  } catch (error) {
    console.error('Erreur getMessages:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const { schoolId, channelId, text, avatar, schoolColor, role } = req.body;

    if (!schoolId || !text) {
      return res.status(400).json({ message: 'L\'école et le texte sont requis.' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const message = await Message.create({
      schoolId,
      channelId: channelId || 'general',
      user: user._id,
      name: user.name,
      role: role || 'student', // student by default, unless AI makes a post
      avatar: avatar || '😊',
      text,
      schoolColor
    });

    const formattedMsg = {
      id: message._id,
      user: message.name,
      avatar: message.avatar,
      text: message.text,
      date: new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: message.role,
      schoolColor: message.schoolColor,
      isMe: true
    };

    res.status(201).json(formattedMsg);
  } catch (error) {
    console.error('Erreur postMessage:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.clearForum = async (req, res) => {
  try {
    const { schoolId } = req.query;
    if (!schoolId) {
      return res.status(400).json({ message: 'L\'ID de l\'école est requis.' });
    }
    await Message.deleteMany({ schoolId });
    res.json({ message: 'Tableau nettoyé avec succès.' });
  } catch (error) {
    console.error('Erreur clearForum:', error);
    res.status(500).json({ message: error.message });
  }
};
