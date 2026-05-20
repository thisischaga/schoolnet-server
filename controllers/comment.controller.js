const Comment = require('../models/Comment');

// Get all comments for a course
exports.getComments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const comments = await Comment.find({ courseId, parentId: null })
      .populate('userId', 'name email')
      .populate('likes', '_id')
      .sort({ createdAt: -1 });

    // Fetch replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parentId: comment._id })
          .populate('userId', 'name email')
          .populate('likes', '_id')
          .sort({ createdAt: 1 });
        return { ...comment.toObject(), replies };
      })
    );

    res.json(commentsWithReplies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { text, parentId } = req.body;

    const comment = await Comment.create({
      courseId,
      userId: req.userId,
      text,
      parentId: parentId || null,
    });

    const populated = await Comment.findById(comment._id)
      .populate('userId', 'name email');

    res.status(201).json({ ...populated.toObject(), replies: [] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle like on a comment
exports.toggleLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });

    const likeIndex = comment.likes.indexOf(req.userId);
    if (likeIndex === -1) {
      comment.likes.push(req.userId);
    } else {
      comment.likes.splice(likeIndex, 1);
    }

    await comment.save();
    res.json({ likes: comment.likes.length, liked: likeIndex === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment (only by the author)
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' });

    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Non autorisé' });
    }

    // Delete all replies too
    await Comment.deleteMany({ parentId: commentId });
    await Comment.findByIdAndDelete(commentId);

    res.json({ message: 'Commentaire supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
