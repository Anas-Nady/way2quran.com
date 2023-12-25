const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const asyncHandler = require("express-async-handler");

const signToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.isAdmin);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
  };

  res.cookie("jwt", token, cookieOptions);
  res.locals.isAdmin = user.isAdmin;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

module.exports = createSendToken;
