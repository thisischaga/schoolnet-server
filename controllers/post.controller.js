const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts (latest first)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name level faculty schoolName')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text && !req.file) {
      return res.status(400).json({ message: 'Le texte ou une image est requis pour publier.' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/posts/${req.file.filename}`;
    }

    const post = await Post.create({
      user: req.userId,
      text: text || '',
      image: imageUrl
    });

    const populatedPost = await Post.findById(post._id).populate('user', 'name level faculty schoolName');
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle like / unlike on a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }

    const userIdIndex = post.likes.indexOf(req.userId);
    if (userIdIndex > -1) {
      // Unlike
      post.likes.splice(userIdIndex, 1);
    } else {
      // Like
      post.likes.push(req.userId);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a post
exports.commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Le texte du commentaire est requis.' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }

    post.comments.push({
      userId: req.userId,
      userName: user.name,
      text
    });

    await post.save();
    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
