const User = require('../models/User');

exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    const currentUser = await User.findById(req.userId);
    
    // Simple regex search on name, schoolName, or faculty
    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        { role: 'student' },
        {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { schoolName: { $regex: q, $options: 'i' } },
            { faculty: { $regex: q, $options: 'i' } },
          ]
        }
      ]
    })
    .select('name email level faculty schoolName friends friendRequestsReceived')
    .limit(20);

    // Map results to include status (friend or request sent)
    const results = users.map(u => ({
      _id: u._id,
      name: u.name,
      level: u.level,
      faculty: u.faculty,
      schoolName: u.schoolName,
      isFriend: currentUser.friends.includes(u._id),
      requestSent: currentUser.friendRequestsSent?.includes(u._id) || u.friendRequestsReceived.includes(req.userId),
    }));

    res.json(results);
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
