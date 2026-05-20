const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const fs = require('fs');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Ensure upload folders exist
const uploadsDir = path.join(__dirname, 'uploads');
const postsDir = path.join(__dirname, 'uploads/posts');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
const logger = require('./middleware/logger.middleware');
app.use(logger);
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/auth.routes');
const aiRoutes = require('./routes/ai.routes');
const courseRoutes = require('./routes/course.routes');
const userRoutes = require('./routes/user.routes');
const forumRoutes = require('./routes/forum.routes');
const commentRoutes = require('./routes/comment.routes');
const statsRoutes = require('./routes/stats.routes');
const friendRoutes = require('./routes/friend.routes');
const dmRoutes = require('./routes/dm.routes');
const postRoutes = require('./routes/post.routes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/dm', dmRoutes);
app.use('/api/posts', postRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('SchoolNet AI API is running...');
});

// ─── Socket.IO Real-Time Messaging ───────────────────────────────
const jwt = require('jsonwebtoken');
const DirectMessage = require('./models/DirectMessage');
const User = require('./models/User');

// Map userId -> socketId for online status
const onlineUsers = new Map();

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Authentication required'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.userId;
  onlineUsers.set(userId, socket.id);
  console.log(`🟢 User connected: ${userId}`);

  // Broadcast online status to friends
  io.emit('user_online', { userId });

  // Send message
  socket.on('send_message', async (data) => {
    try {
      const { receiverId, text } = data;
      const conversationId = DirectMessage.getConversationId(userId, receiverId);

      const message = await DirectMessage.create({
        conversationId,
        sender: userId,
        receiver: receiverId,
        text,
      });

      const populated = await DirectMessage.findById(message._id)
        .populate('sender', 'name')
        .populate('receiver', 'name');

      const msgData = populated.toObject();

      // Send to sender
      socket.emit('new_message', msgData);

      // Send to receiver if online
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('new_message', msgData);
      }
    } catch (err) {
      console.error('Socket send_message error:', err);
      socket.emit('message_error', { error: err.message });
    }
  });

  // Typing indicator
  socket.on('typing', (data) => {
    const receiverSocketId = onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('user_typing', { userId, conversationId: data.conversationId });
    }
  });

  socket.on('stop_typing', (data) => {
    const receiverSocketId = onlineUsers.get(data.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('user_stop_typing', { userId, conversationId: data.conversationId });
    }
  });

  // Mark messages as read
  socket.on('mark_read', async (data) => {
    try {
      await DirectMessage.updateMany(
        { conversationId: data.conversationId, receiver: userId, read: false },
        { read: true }
      );
      // Notify sender
      const senderSocketId = onlineUsers.get(data.otherUserId);
      if (senderSocketId) {
        io.to(senderSocketId).emit('messages_read', { conversationId: data.conversationId });
      }
    } catch (err) {
      console.error('mark_read error:', err);
    }
  });

  // Get online status
  socket.on('check_online', (data) => {
    const isOnline = onlineUsers.has(data.userId);
    socket.emit('online_status', { userId: data.userId, isOnline });
  });

  socket.on('disconnect', () => {
    onlineUsers.delete(userId);
    io.emit('user_offline', { userId });
    console.log(`🔴 User disconnected: ${userId}`);
  });
});

// Error Handler
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');
app.use(notFoundHandler);
app.use(errorHandler);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/schoolnet')
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (HTTP + WebSocket)`);
    });
  })
  .catch(err => console.error('Could not connect to MongoDB:', err));
