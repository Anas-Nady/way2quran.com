import AppError from "../utils/appError";
import asyncHandler from "express-async-handler";
import userModel from "../models/userModel";

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user?._id);

  if (!user) {
    return next(new AppError("user with that ID is not found", 404));
  }

  res.status(200).json({
    status: "success",
    isAdmin: user.isAdmin,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user?._id).select("+password");

  if (user) {
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    await user.save();
  }

  res.json({
    status: "success",
  });
});
