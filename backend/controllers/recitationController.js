const Recitation = require("../models/recitationModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAllRecitations = asyncHandler(async (req, res, next) => {
  const recitations = await Recitation.find({});

  if (!recitations) {
    return next(new AppError("No recitations found.", 404));
  }

  res.status(200).json({
    status: "success",
    recitations,
  });
});

exports.getRecitation = asyncHandler(async (req, res, next) => {
  const recitation = await Recitation.findOne({ slug: req.params.slug });

  if (!recitation) {
    return next(new AppError("The recitation not found", 404));
  }

  res.status(200).json({
    status: "success",
    recitation,
  });
});
