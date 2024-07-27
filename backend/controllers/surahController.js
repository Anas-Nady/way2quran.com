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

  const audioFile = recitation.audioFiles.find(
    (file) => file.surahNumber == isSurahExists.number
  );

  surahInfo.url = audioFile.url;
  surahInfo.downloadUrl = audioFile.downloadUrl;

  res.status(200).json({
    status: "success",
    surah: surahInfo,
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
