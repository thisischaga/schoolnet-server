const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_key');
    req.userId = decoded.id;
    console.log(`Authenticated user: ${req.userId}`);
    
    if (typeof next === 'function') {
      next();
    } else {
      console.error('Next is not a function in Auth Middleware!');
      res.status(500).json({ message: 'Internal server error: next is not a function' });
    }
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
