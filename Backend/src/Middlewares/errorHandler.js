import ApiError from "../Utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "INTERNAL SERVER ERROR";

  if (err instanceof ApiError) {
    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      errors: err.errors,
      stack: err?.stack,
    });
  } else {
    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
}

export default errorHandler;