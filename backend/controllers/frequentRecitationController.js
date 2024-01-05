const FrequentRecitation = require("./../models/frequentRecitationsModel");
const asyncHandler = require("express-async-handler");
const AppError = require("./../utils/appError");

exports.getAllFrequentRecitations = asyncHandler(async (req, res, next) => {
  const frequentRecitations = await FrequentRecitation.find({});

  res.status(200).json({
    status: "success",
    data: frequentRecitations,
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

// exports.createFrequentRecitation = asyncHandler(async (req, res, next) => {
//   const frequentRecitations = req.body;

//   const createdRecitations = [];

//   for (const recitation of frequentRecitations) {
//     const { name, name_ar } = recitation;

//     const newRecitation = await FrequentRecitation.create({ name, name_ar });

//     createdRecitations.push(newRecitation);
//   }

//   // if (!frequentRecitation) {
//   //   return next(
//   //     new AppError(
//   //       "Frequent Recitation not created yet, Please try again!",
//   //       400
//   //     )
//   //   );
//   // }

//   res.status(201).json({
//     status: "success",
//     data: createdRecitations,
//   });
// });
