import AppError from "../utils/appError";
import asyncHandler from "express-async-handler";
import Surah from "./../models/surahModel";

export const getSurahInfo = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  const fields = `arabicName englishName slug number ${req.query.selectField}`;

  const surah = await Surah.findOne({ slug }).select(fields);
  if (!surah) {
    return next(new AppError(`Surah: ${slug} is not found`, 404));
  }

  const surahNumber = surah.number;
  let previousSurah;
  let nextSurah;

  if (surahNumber > 1) {
    previousSurah = await Surah.findOne({ number: surahNumber - 1 }).select(
      fields
    );
  }
  if (surahNumber < 144) {
    nextSurah = await Surah.findOne({ number: surahNumber + 1 }).select(fields);
  }

  res.status(200).json({
    status: "success",
    surah,
    previousSurah,
    nextSurah,
  });
});

export const getAllSurahs = asyncHandler(async (req, res, next) => {
  const surahs = await Surah.find({});

  if (surahs.length === 0) {
    return next(new AppError("No Surahs found", 404));
  }

  res.status(200).json({
    status: "success",
    surahs,
  });
});
