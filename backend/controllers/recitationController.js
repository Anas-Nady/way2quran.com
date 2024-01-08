const Recitation = require("../models/recitationModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");

exports.getAllRecitations = asyncHandler(async (req, res, next) => {
  const recitations = await Recitation.find({});

  res.status(200).json({
    status: "success",
    data: recitations,
  });
});

exports.getRecitation = asyncHandler(async (req, res, next) => {
  const recitation = await Recitation.findById(req.params.id);

  if (!recitation) {
    return next(new AppError("recitation not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: recitation,
  });
});

exports.createRecitation = asyncHandler(async (req, res, next) => {
  const recitations = req.body;

  const createdRecitations = [];

  for (const recitation of recitations) {
    const { name, name_ar } = recitation;

    const newRecitation = await Recitation.create({ name, name_ar });

    createdRecitations.push(newRecitation);
  }

  // if (!Recitation) {
  //   return next(
  //     new AppError(
  //       " Recitation not created yet, Please try again!",
  //       400
  //     )
  //   );
  // }

  res.status(201).json({
    status: "success",
    data: createdRecitations,
  });
});
