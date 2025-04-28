const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    // Optionally include stack trace in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;

