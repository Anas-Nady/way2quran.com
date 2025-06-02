import AppError from "./../utils/appError";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in..", 401));
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string
  ) as DecodedToken;

  const currentUser = await userModel.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does not exist.", 401)
    );
  }

  req.user = currentUser;
  next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(
      new AppError("You do not have permission to perform this action.", 403)
    );
  }

  next();
});
