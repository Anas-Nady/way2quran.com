class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    //  is used to capture a more informative stack trace when creating an error object, and removing it will result in a less detailed error message.
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
