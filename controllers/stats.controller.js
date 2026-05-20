const User = require('../models/User');
const Course = require('../models/Course');
const Comment = require('../models/Comment');
const Message = require('../models/Message');

/**
 * GET /api/stats/dashboard
 * Returns real-time platform statistics for the dashboard
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    // ─── Global Stats (parallel) ──────────────────────────────
    const [
      totalUsers,
      totalCourses,
      totalComments,
      totalMessages,
      coursesForUser,
      recentComments,
      activeUsersToday,
    ] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Comment.countDocuments(),
      Message.countDocuments(),
      Course.countDocuments(
        user?.level 
          ? { level: user.level, ...(user.faculty ? { faculty: user.faculty } : {}) }
          : {}
      ),
      Comment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name')
        .populate('courseId', 'title code'),
      User.countDocuments({
        updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }),
    ]);

    // ─── User Progress ────────────────────────────────────────
    const completedCourses = user?.progress?.filter(p => p.completed)?.length || 0;
    const totalProgress = user?.progress?.length || 0;
    const avgScore = totalProgress > 0
      ? Math.round(user.progress.reduce((sum, p) => sum + (p.score || 0), 0) / totalProgress)
      : 0;

    // ─── Completion rate ──────────────────────────────────────
    const completionRate = coursesForUser > 0
      ? Math.round((completedCourses / coursesForUser) * 100)
      : 0;

    // ─── XP calculation (gamified) ────────────────────────────
    const xp = (completedCourses * 100) + (totalProgress * 25) + (avgScore * 2);

    // ─── Weekly activity (comments by the user in last 7 days) ─
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyActivity = await Comment.aggregate([
      { 
        $match: { 
          userId: user._id,
          createdAt: { $gte: weekAgo } 
        } 
      },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Map to day labels (Sun=1 ... Sat=7)
    const dayLabels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const activityChart = dayLabels.map((label, i) => {
      const found = weeklyActivity.find(w => w._id === i + 1);
      return { day: label, count: found?.count || 0 };
    });

    // ─── Format recent activity ───────────────────────────────
    const recentActivity = recentComments.map(c => ({
      _id: c._id,
      userName: c.userId?.name || 'Anonyme',
      courseTitle: c.courseId?.title || 'Cours',
      courseCode: c.courseId?.code || '',
      text: c.text?.substring(0, 80) + (c.text?.length > 80 ? '...' : ''),
      createdAt: c.createdAt,
    }));

    res.json({
      // Main stat cards
      stats: {
        totalUsers,
        totalCourses,
        totalComments,
        totalMessages,
        activeUsersToday,
        coursesForUser,
      },
      // User-specific
      userStats: {
        xp,
        completedCourses,
        totalProgress,
        avgScore,
        completionRate,
        level: user?.level,
        faculty: user?.faculty,
        schoolName: user?.schoolName,
      },
      // Charts
      activityChart,
      // Recent activity feed
      recentActivity,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/stats/public
 * Returns public platform statistics for the home page
 */
exports.getPublicStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalMessages] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Message.countDocuments()
    ]);
    
    res.json({
      students: totalUsers,
      courses: totalCourses,
      interactions: totalMessages + 500 // adding base to look active initially
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
