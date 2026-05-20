const User = require('../models/User');

// Get friend suggestions (same school/faculty, not already friends)
exports.getSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const friendIds = user.friends || [];
    const sentIds = (user.friendRequestsSent || []);
    const receivedIds = (user.friendRequestsReceived || []);
    const excludeIds = [user._id, ...friendIds, ...sentIds, ...receivedIds];

    // Find users from same school or faculty who are students
    let query = { _id: { $nin: excludeIds }, role: 'student' };
    if (user.schoolId) {
      query.schoolId = user.schoolId;
    } else if (user.faculty) {
      query.faculty = user.faculty;
    } else if (user.level) {
      query.level = user.level;
    }

    const suggestions = await User.find(query)
      .select('name email level faculty schoolName')
      .limit(10);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send friend request
exports.sendRequest = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    if (req.userId === targetUserId) {
      return res.status(400).json({ message: 'Impossible de s\'ajouter soi-même' });
    }

    const [user, target] = await Promise.all([
      User.findById(req.userId),
      User.findById(targetUserId),
    ]);

    if (!target) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Check if already friends
    if (user.friends?.includes(targetUserId)) {
      return res.status(400).json({ message: 'Déjà amis' });
    }

    // Check if request already sent
    if (user.friendRequestsSent?.includes(targetUserId)) {
      return res.status(400).json({ message: 'Demande déjà envoyée' });
    }

    // Add to sent/received
    user.friendRequestsSent = [...(user.friendRequestsSent || []), targetUserId];
    target.friendRequestsReceived = [...(target.friendRequestsReceived || []), req.userId];

    await Promise.all([user.save(), target.save()]);

    res.json({ message: 'Demande envoyée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept friend request
exports.acceptRequest = async (req, res) => {
  try {
    const { fromUserId } = req.body;

    const [user, sender] = await Promise.all([
      User.findById(req.userId),
      User.findById(fromUserId),
    ]);

    if (!sender) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Remove from pending
    user.friendRequestsReceived = (user.friendRequestsReceived || []).filter(
      id => id.toString() !== fromUserId
    );
    sender.friendRequestsSent = (sender.friendRequestsSent || []).filter(
      id => id.toString() !== req.userId
    );

    // Add to friends list
    user.friends = [...(user.friends || []), fromUserId];
    sender.friends = [...(sender.friends || []), req.userId];

    await Promise.all([user.save(), sender.save()]);

    const populatedSender = await User.findById(fromUserId).select('name email level faculty schoolName');
    res.json(populatedSender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject friend request
exports.rejectRequest = async (req, res) => {
  try {
    const { fromUserId } = req.body;

    const [user, sender] = await Promise.all([
      User.findById(req.userId),
      User.findById(fromUserId),
    ]);

    user.friendRequestsReceived = (user.friendRequestsReceived || []).filter(
      id => id.toString() !== fromUserId
    );
    if (sender) {
      sender.friendRequestsSent = (sender.friendRequestsSent || []).filter(
        id => id.toString() !== req.userId
      );
      await sender.save();
    }
    await user.save();

    res.json({ message: 'Demande refusée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get friends list
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.friends?.length) return res.json([]);

    const friends = await User.find({ _id: { $in: user.friends } })
      .select('name email level faculty schoolName');

    res.json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending friend requests received
exports.getRequests = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.friendRequestsReceived?.length) return res.json([]);

    const requests = await User.find({ _id: { $in: user.friendRequestsReceived } })
      .select('name email level faculty schoolName');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
  try {
    const { friendId } = req.params;

    const [user, friend] = await Promise.all([
      User.findById(req.userId),
      User.findById(friendId),
    ]);

    user.friends = (user.friends || []).filter(id => id.toString() !== friendId);
    if (friend) {
      friend.friends = (friend.friends || []).filter(id => id.toString() !== req.userId);
      await friend.save();
    }
    await user.save();

    res.json({ message: 'Ami supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
