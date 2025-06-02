import { Response } from "express";
import { IUser } from "../models/userModel";

import jwt, { SignOptions } from "jsonwebtoken";

interface CustomJwtPayload {
  id: string;
}

const signToken = (id: string): string => {
  const payload: CustomJwtPayload = { id };
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

  const signOptions: SignOptions = {
    expiresIn: "30d",
  };

  return jwt.sign(payload, JWT_SECRET_KEY, signOptions);
};

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user._id.toString());
  const JWT_Expires_IN = process.env.JWT_COOKIE_EXPIRES_IN as string;

  const cookieOptions = {
    expires: new Date(
      Date.now() + parseInt(JWT_Expires_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export default createSendToken;
