const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel.js");
const createSendToken = require("./../utils/createSendToken.js");

// exports.register = asyncHandler(async (req, res, next) => {
//   const { name, email, password } = req.body;

//   const userIsExists = await User.findOne({ email });
//   if (userIsExists) return next(new AppError("User already exists!", 400));

//   const newUser = await User.create({ name, email, password, isAdmin });

//   createSendToken(newUser, 201, res);
// });

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password.", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }

  createSendToken(user, 200, res);
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  req.user = null;

  res.status(200).json({ status: "success" });
});
