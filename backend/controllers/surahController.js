const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const Surah = require("./../models/surahModel.js");

exports.createSurah = asyncHandler(async (req, res, next) => {
  const surahDataArray = req.body;

  // Validate if surahDataArray is an array
  if (!Array.isArray(surahDataArray)) {
    return next(
      new AppError("Invalid request. Expected an array of Surah data.", 400)
    );
  }

  // Create an array to store created Surah documents
  const createdSurahs = [];

  // Loop through each Surah data in the array
  for (const surahData of surahDataArray) {
    const { name, name_ar, name_translation, number } = surahData;

    // Create a new Surah document
    const newSurah = await Surah.create({
      name,
      name_ar,
      name_translation,
      number,
    });

    // Add the created Surah to the array
    createdSurahs.push(newSurah);
  }

  res.status(201).json({
    status: "success",
    length: createdSurahs.length,
    data: createdSurahs,
  });
});

exports.getSurah = asyncHandler(async (req, res, next) => {
  const surah = await Surah.findById(req.params.id);

  if (!surah) {
    return next(new AppError("Surah with that ID is not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: surah,
  });
});

exports.getAllSurahs = asyncHandler(async (req, res, next) => {
  const surahs = await Surah.find({});

  res.status(200).json({
    status: "success",
    length: surahs.length,
    data: surahs,
  });
});

exports.deleteAllSurahs = asyncHandler(async (req, res, next) => {
  const deletedSurahs = await Surah.deleteMany({});

  res.status(200).json({
    status: "success",
  });
});
