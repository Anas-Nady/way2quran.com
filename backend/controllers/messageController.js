const messageModel = require("./../models/messageModel.js");
const AppError = require("./../utils/appError.js");
const asyncHandler = require("express-async-handler");

exports.listAllMessages = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 5;
  const page = Number(req.query.pageNumber) || 1;

  const count = await messageModel.countDocuments();
  const messages = await messageModel
    .find()
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    data: {
      pagination: {
        totalCount: count,
        page,
        pages: Math.ceil(count / pageSize),
      },
      messages,
    },
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
  const { name, email, phono, content } = req.body;
  const newMessage = await messageModel.create({ name, email, phono, content });

  if (!newMessage) {
    return next(new AppError("Invalid data received", 400));
  }

  res.status(201).json({
    message: "success",
    data: newMessage,
  });
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await messageModel.findOneAndDelete({
    slug: req.params.slug,
  });

  if (!message) {
    return next(new AppError("this message is not available!.", 404));
  }

  res.status(200).json({ message: "deleted message successfully" });
});
