const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel.js");

exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);

  if (!user) {
    return next(new AppError("user with that ID is not found", 404));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("+password");

  if (user) {
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
  }
  const updatedUser = await user.save();

  res.json({
    status: "success",
    user: updatedUser,
  });
});
