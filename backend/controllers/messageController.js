const messageModel = require("./../models/messageModel.js");
const AppError = require("./../utils/appError.js");
const asyncHandler = require("express-async-handler");
const smtpTransporter = require("../config/smtpTransport.js");
const EmailTemplate = require("../templates/email.js");
const { SUBJECT } = require("../constants/email.js");

exports.listAllMessages = asyncHandler(async (req, res, next) => {
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

exports.getUnreadMessages = asyncHandler(async (req, res, next) => {
  const messages = await messageModel.find({ isRead: false });

  res.status(200).json({
    status: "success",
    messagesCount: messages?.length,
  });
});

exports.createMessage = asyncHandler(async (req, res, next) => {
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

exports.sendMessage = asyncHandler(async (req, res, next) => {
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
  } catch (error) {
    return next(new AppError("Failed to send email ", error, 500));
  }

  res.status(200).json({ message: "success" });
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await messageModel.findOne({
    slug: req.params.slug,
  });

  if (!message) {
    return next(new AppError("this message is not available!.", 404));
  }

  await messageModel.deleteOne({ slug: req.params.slug });

  res.status(200).json({ message: "deleted message successfully" });
});
