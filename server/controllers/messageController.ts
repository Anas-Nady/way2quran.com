import messageModel from "./../models/messageModel";
import AppError from "./../utils/appError";
import asyncHandler from "express-async-handler";
import smtpTransporter from "../config/smtpTransport";
import EmailTemplate from "../templates/email";
import { SUBJECT } from "../constants/email";

export const listAllMessages = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 6;
  const page = Number(req.query.currentPage) || 1;

  const count = await messageModel.countDocuments();
  const messages = await messageModel
    .find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  // Set all messages' read property to true
  await messageModel.updateMany({}, { $set: { isRead: true } });

  res.status(200).json({
    status: "success",
    pagination: {
      totalCount: count,
      page,
      pages: Math.ceil(count / pageSize),
    },
    messages,
  });
});

export const getUnreadMessages = asyncHandler(async (req, res, next) => {
  const messages = await messageModel.find({ isRead: false });

  res.status(200).json({
    status: "success",
    messagesCount: messages?.length,
  });
});

export const createMessage = asyncHandler(async (req, res, next) => {
  const { senderName, senderEmail, content } = req.body;

  if (!senderName || !senderEmail || !content) {
    return next(new AppError("Please provide all data for us", 400));
  }

  const newMessage = await messageModel.create({
    senderName,
    senderEmail,
    content,
  });

  if (!newMessage) {
    return next(new AppError("Invalid data received", 400));
  }

  res.status(201).json({
    message: "success",
    data: newMessage,
  });
});

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { receiverEmail, content } = req.body;

  if (!receiverEmail || !content) {
    return next(new AppError("Please provide all data for us", 400));
  }

  try {
    const mailOptions = {
      from: `Way2quran.com ${process.env.SMTP_EMAIL}`,
      to: receiverEmail,
      subject: SUBJECT,
      html: EmailTemplate({ content }),
    };

    // Send email using SMTP transporter
    await smtpTransporter.sendMail(mailOptions);
  } catch (error: any) {
    return next(
      new AppError(`Failed to send email: ${error.message}`, error.status)
    );
  }

  res.status(200).json({ message: "success" });
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await messageModel.findOne({
    slug: req.params.slug,
  });

  if (!message) {
    return next(new AppError("this message is not available!.", 404));
  }

  await messageModel.deleteOne({ slug: req.params.slug });

  res.status(200).json({ message: "deleted message successfully" });
});
