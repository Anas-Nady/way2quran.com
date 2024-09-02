const Recitation = require("../models/recitationModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const ViewRecord = require("../models/viewRecordModel");

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

  const userIp =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Check if this IP has already been counted
  const existingView = await ViewRecord.findOne({
    "reference.type": "Recitation",
    "reference.id": recitation._id,
    userIp,
  });

  if (!existingView) {
    recitation.totalListeners++;
    await recitation.save();

    await ViewRecord.create({
      reference: {
        type: "Recitation",
        id: recitation._id,
      },
      userIp,
    });
  }

  res.status(200).json({
    status: "success",
    recitation,
  });
});
