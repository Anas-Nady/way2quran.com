const FrequentRecitation = require("./../models/frequentRecitationsModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/appError");

exports.getAllFrequentRecitations = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: new RegExp(req.query.keyword, "i" + "u"),
        },
      }
    : {};

  const count = await FrequentRecitation.countDocuments({ ...keyword });
  const totalPages = Math.ceil(count / pageSize);

  const frequentRecitations = await FrequentRecitation.find(keyword)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.status(200).json({
    status: "success",
    data: frequentRecitations,
    pagination: {
      page,
      pages: totalPages,
      totalCount: count,
    },
  });
});

exports.getFrequentRecitation = asyncHandler(async (req, res, next) => {
  const frequentRecitation = await FrequentRecitation.findById(req.params.id);

  if (!frequentRecitation) {
    return next(new AppError("Frequent Recitation not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: frequentRecitation,
  });
});

exports.createFrequentRecitation = asyncHandler(async (req, res, next) => {
  const frequentRecitation = await FrequentRecitation.create(req.body);

  if (!frequentRecitation) {
    return next(
      new AppError(
        "Frequent Recitation not created yet, Please try again!",
        400
      )
    );
  }

  res.status(201).json({
    status: "success",
    data: frequentRecitation,
  });
});

exports.updateFrequentRecitation = asyncHandler(async (req, res, next) => {
  const currentRecitation = await FrequentRecitation.findById(req.params.id);

  if (!currentRecitation) {
    return next(new AppError("Frequent Recitation not found", 404));
  }

  currentRecitation.name = req.body.name || currentRecitation.name;
  currentRecitation.name_ar = req.body.name_ar || currentRecitation.name_ar;

  if (req.body.reciters && req.body.reciters.length > 0) {
    currentRecitation.reciter.push(...req.body.reciters);
  }

  await currentRecitation.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedRecitation: currentRecitation,
    },
  });
});

exports.deleteFrequentRecitation = asyncHandler(async (req, res, next) => {
  const frequentRecitation = await FrequentRecitation.findByIdAndDelete(
    req.params.id
  );

  if (!frequentRecitation) {
    return next(new AppError("Frequent Recitation not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {},
  });
});
