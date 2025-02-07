import AppError from "../utils/appError";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../models/userModel";
import createSendToken from "./../utils/createSendToken";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

export const register = asyncHandler(async (req: Request, res, next) => {
  const { name, email, password } = req.body;

  const userIsExists = await User.findOne({ email });
  if (userIsExists) return next(new AppError("User already exists!", 400));

  const newUser = await User.create({ name, email, password });

  createSendToken(newUser, 201, res);
});

export const login = asyncHandler(async (req: Request, res, next) => {
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

export const logout = asyncHandler(async (req: Request, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  if (req.user) {
    req.user = null;
  }

  res.status(200).json({ status: "success" });
});
