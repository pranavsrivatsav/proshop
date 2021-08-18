// Middleware to handle 404 routes

const notfound = (req, res, next) => {
  const error = new Error(`404 - Page Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware to handle requests which have thrown an error

const errorHandler = (err, req, res, next) => {
  /* 
    if response headers are sent, i.e valid response has been made, proceed to next.
    NOTE: if this is not done, then an error will be thrown as follows:
    Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  */
  if (res.headersSent) next();

  // else (i.e error response), handle the response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.NODE_ENV === 'production' ? null : err.stack,
  });
  next();
};

export { notfound, errorHandler };
