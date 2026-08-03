const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid resource ID.",
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists.`,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors: Object.values(err.errors).map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired.",
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;

  // For genuinely unexpected errors (bugs, not something we deliberately
  // threw with a statusCode), don't echo the raw error message back to
  // the client — that leaks implementation details (e.g. the
  // "Cannot read properties of undefined..." TypeError users used to
  // see) and isn't actionable for them anyway. Full details are already
  // logged above via console.error for debugging.
  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong on our end. Please try again."
      : err.message || "Internal Server Error.";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;