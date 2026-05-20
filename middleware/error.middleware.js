const errorHandler = (err, req, res, next) => {
  console.error('💥 Error caught in middleware:', err.stack || err.message || err);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Une erreur interne du serveur est survenue.',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Ressource non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFoundHandler };
