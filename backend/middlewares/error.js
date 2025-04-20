// Define the ErrorHandler class
export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error-handling middleware
export const errorMiddleware = (err, req, res, next) => {
  // Convert plain string errors into ErrorHandler instances
  if (typeof err === "string") {
    err = new ErrorHandler(err, 500);
  }

  // Set default values if not provided
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Invalid MongoDB ObjectId error
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid ${err.path}`, 400);
  }

  // Duplicate key error (e.g., email already exists)
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue).join(", ");
    err = new ErrorHandler(`Duplicate ${duplicateField} entered`, 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("JSON Web Token is invalid. Please try again!", 400);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("JSON Web Token has expired. Please login again.", 400);
  }

  // Final error response
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
