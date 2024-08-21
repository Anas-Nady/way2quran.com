const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const Surah = require("./../models/surahModel.js");
const Reciter = require("./../models/reciterModel.js");
const Recitation = require("./../models/recitationModel.js");

exports.getSurahInfo = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  const surah = await Surah.findOne({ slug }).select(
    "arabicName englishName slug number"
  );
  if (!surah) {
    return next(new AppError(`Surah: ${slug} is not found`, 404));
  }

  res.status(200).json({
    status: "success",
    surah,
  });
});

exports.getAllSurahs = asyncHandler(async (req, res, next) => {
  const surahs = await Surah.find({});

  if (surahs.length === 0) {
    return next(new AppError("No Surahs found", 404));
  }

  res.status(200).json({
    status: "success",
    surahs,
  });
});

exports.getSurahWithReciter = asyncHandler(async (req, res, next) => {
  const surahSlug = req.params.surahSlug;
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;

  const isRecitationExists = await Recitation.findOne({ slug: recitationSlug });
  if (!isRecitationExists) {
    return next(
      new AppError(`Recitation: ${recitationSlug} is not found`, 404)
    );
  }

  const isSurahExists = await Surah.findOne({ slug: surahSlug });
  if (!isSurahExists) {
    return next(new AppError(`Surah: ${surahSlug} is not found`, 404));
  }

  const filter = {
    slug: reciterSlug,
    "recitations.recitationInfo": isRecitationExists._id,
    "recitations.audioFiles.surahInfo": isSurahExists._id,
  };

  const reciter = await Reciter.findOne(filter);
  if (!reciter) {
    return next(
      new AppError(
        `this resource: /${reciterSlug}/${recitationSlug}/${surahSlug} is not found`,
        404
      )
    );
  }

  const surahInfo = { ...isSurahExists.toObject() };

  const recitation = reciter.recitations.find(
    (rec) => rec.recitationInfo.toString() === isRecitationExists._id.toString()
  );

  if (!recitation) {
    return next(
      new AppError(
        `this resource: /${reciterSlug}/${recitationSlug}/${surahSlug} is not found`,
        404
      )
    );
  }

  let audioFile;
  let nextSurahNumber;
  let previousSurahNumber;

  for (let i = 0; i < recitation.audioFiles.length; i++) {
    if (recitation.audioFiles[i].surahNumber == isSurahExists.number) {
      audioFile = recitation.audioFiles[i];
      nextSurahNumber = recitation.audioFiles[i + 1]?.surahNumber;
      previousSurahNumber = recitation.audioFiles[i - 1]?.surahNumber;
      break;
    }
  }

  let nextSurah;
  let previousSurah;

  if (nextSurahNumber) {
    nextSurah = await Surah.findOne({ number: nextSurahNumber }).select(
      "arabicName englishName slug number"
    );
  }

  if (previousSurahNumber) {
    previousSurah = await Surah.findOne({ number: previousSurahNumber }).select(
      "arabicName englishName slug number"
    );
  }

  if (!audioFile) {
    return next(new AppError("No audio file found for this surah", 404));
  }

  surahInfo.url = audioFile.url;
  surahInfo.downloadUrl = audioFile.downloadUrl;

  res.status(200).json({
    status: "success",
    surah: surahInfo,
    nextSurah,
    previousSurah,
    recitation: {
      arabicName: isRecitationExists.arabicName,
      englishName: isRecitationExists.englishName,
    },
    reciter: {
      arabicName: reciter.arabicName,
      englishName: reciter.englishName,
      slug: reciter.slug,
      photo: reciter.photo,
    },
  });
});
