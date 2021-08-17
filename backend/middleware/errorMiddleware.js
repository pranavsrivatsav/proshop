// Middleware to handle 404 routes

const notfound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware to handle requests which have thrown an error

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export { notfound, errorHandler };
