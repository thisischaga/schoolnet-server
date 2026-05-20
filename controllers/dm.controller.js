const DirectMessage = require('../models/DirectMessage');
const User = require('../models/User');

// Get conversations list (latest message per conversation)
exports.getConversations = async (req, res) => {
  try {
    const userId = req.userId;

    const conversations = await DirectMessage.aggregate([
      {
        $match: {
          $or: [
            { sender: require('mongoose').Types.ObjectId.createFromHexString(userId) },
            { receiver: require('mongoose').Types.ObjectId.createFromHexString(userId) },
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$conversationId',
          lastMessage: { $first: '$text' },
          lastDate: { $first: '$createdAt' },
          sender: { $first: '$sender' },
          receiver: { $first: '$receiver' },
          read: { $first: '$read' },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [
                  { $eq: ['$read', false] },
                  { $ne: ['$sender', require('mongoose').Types.ObjectId.createFromHexString(userId)] }
                ]},
                1,
                0
              ]
            }
          }
        }
      },
      { $sort: { lastDate: -1 } }
    ]);

    // Populate the other user's info
    const populated = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = conv.sender.toString() === userId
          ? conv.receiver
          : conv.sender;
        const otherUser = await User.findById(otherUserId).select('name email level faculty');
        return {
          conversationId: conv._id,
          otherUser,
          lastMessage: conv.lastMessage,
          lastDate: conv.lastDate,
          unreadCount: conv.unreadCount,
        };
      })
    );

    res.json(populated);
  } catch (error) {
    console.error('getConversations error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get messages for a specific conversation
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const messages = await DirectMessage.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('sender', 'name')
      .populate('receiver', 'name');

    // Mark messages as read
    await DirectMessage.updateMany(
      { conversationId, receiver: req.userId, read: false },
      { read: true }
    );

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send a message (HTTP fallback, main path is Socket.IO)
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const conversationId = DirectMessage.getConversationId(req.userId, receiverId);

    const message = await DirectMessage.create({
      conversationId,
      sender: req.userId,
      receiver: receiverId,
      text,
    });

    const populated = await DirectMessage.findById(message._id)
      .populate('sender', 'name')
      .populate('receiver', 'name');

    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
