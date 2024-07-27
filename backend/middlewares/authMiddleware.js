const AppError = require("./../utils/appError");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in..", 401));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const currentUser = await userModel.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist.", 401)
    );
  }

  req.user = currentUser;
  res.locals.isAdmin = currentUser.isAdmin; // Store admin status in res.locals
  next();
});

exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      new AppError("You do not have permission to perform this action.", 403)
    );
  }

  next();
});
