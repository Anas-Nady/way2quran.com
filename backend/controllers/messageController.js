const messageModel = require("./../models/messageModel.js");
const AppError = require("./../utils/appError.js");
const asyncHandler = require("express-async-handler");

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

exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await messageModel.findOne({ slug: req.params.slug });

  if (!message) {
    return next(new AppError("this message is not available!.", 404));
  }

  res.status(200).json({ message: "success", data: message });
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
