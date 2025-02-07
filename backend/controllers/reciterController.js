const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const Reciters = require("./../models/reciterModel.js");
const Recitations = require("../models/recitationModel.js");
const Surah = require("../models/surahModel.js");
const {
  storage,
  bucketName,
  defaultPhotoPath,
  cloudBaseUrl,
} = require("./../config/googleStorage.js");
const {
  recitationsFilter,
  searchQuery,
  sortQuery,
} = require("./../utils/recitationsQuery.js");
const { hafsAnAsim } = require("../constants/recitationsTxt.js");
const redisClient = require("../config/redisClient.js");
const uploadFileToGCS = require("../utils/uploadFileToGCS.js");

exports.getAllReciters = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.currentPage) || 1;
  const recitationSlug = req.query.recitationSlug;

  const sortBy = sortQuery(req.query.sort);
  const search = searchQuery(req.query.search);
  const recitations = await recitationsFilter(recitationSlug);

  let isTopReciter;
  if (req.query.isTopReciter === "true" || req.query.isTopReciter === "false") {
    isTopReciter = { isTopReciter: req.query.isTopReciter };
  }

  const count = await Reciters.countDocuments({
    ...search,
    ...isTopReciter,
    ...recitations,
  });
  const reciters = await Reciters.find({
    ...search,
    ...isTopReciter,
    ...recitations,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortBy)
    .select("-recitations");

  res.status(200).json({
    status: "success",
    pagination: {
      totalCount: count,
      page,
      pages: Math.ceil(count / pageSize),
    },
    reciters,
  });
});

exports.getReciterInfo = asyncHandler(async (req, res, next) => {
  const reciter = await Reciters.findOne({ slug: req.params.slug }).select(
    "arabicName englishName slug photo"
  );

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  res.status(200).json({
    status: "success",
    reciter,
  });
});

exports.createReciter = asyncHandler(async (req, res, next) => {
  const { arabicName, englishName, number } = req.body;

  if (number) {
    const isExists = await Reciters.findOne({ number });

    if (isExists) {
      return next(
        new AppError("The Number is already exists with another reciter", 400)
      );
    }
  }

  const newReciter = await Reciters.create({ arabicName, englishName, number });

  if (!newReciter) {
    return next(new AppError("Invalid data received", 400));
  }

  const photo = req.file;

  if (photo) {
    const uploadPhoto = uploadFileToGCS({
      fileToUpload: photo,
      folderName: "imgs",
      fileName: newReciter.slug,
    });
    newReciter.photo = uploadPhoto.publicURL;
  } else {
    newReciter.photo = `${cloudBaseUrl}/${bucketName}/${defaultPhotoPath}`;
  }

  await newReciter.save();

  res.status(201).json({
    status: "success",
    data: newReciter,
  });
});

exports.getReciterDetails = asyncHandler(async (req, res, next) => {
  const slug = req.params.reciterSlug;
  const increaseViews = req.query.increaseViews === "true";

  const reciter = await Reciters.findOne({ slug })
    .populate({
      path: "recitations.recitationInfo",
      model: "Recitations",
    })
    .populate({
      path: "recitations.audioFiles.surahInfo",
      model: "Surah",
      select: "-verses", // Exclude 'verses' field from 'surahId'
    });

  if (!reciter) {
    return next(
      new AppError(
        `Reciter: '${slug}' not found. or does not have the recitation`,
        404
      )
    );
  }

  if (increaseViews) {
    // Increment total viewers and save
    reciter.totalViewers++;
    await reciter.save();
  }

  const dataResponse = {
    message: "success",
    reciter,
  };

  // set the reciter's content in the cache.
  const cachedTime = 3600; // one hour
  redisClient.setEx(`${slug}`, cachedTime, JSON.stringify(dataResponse));

  res.status(200).json(dataResponse);
});

exports.updateReciter = asyncHandler(async (req, res, next) => {
  try {
    const reciter = await Reciters.findOne({ slug: req.params.slug });
    const photo = req.file;

    if (!reciter) {
      return next(new AppError("No reciter has that slug", 404));
    }

    if (photo) {
      try {
        const reciterPhoto = reciter.photo.split("way2quran_storage/")[1];
        if (reciterPhoto !== defaultPhotoPath) {
          await storage.bucket(bucketName).file(reciterPhoto)?.delete();
        }

        const uploadPhoto = uploadFileToGCS({
          fileToUpload: photo,
          folderName: "imgs",
          fileName: reciter.slug,
        });

        // Set the new photo URL
        reciter.photo = uploadPhoto.publicURL;
      } catch (err) {
        return next(
          new AppError(`Failed to upload reciter photo: ${err.message}`, 500)
        );
      }
    }

    if (req.body.arabicName) {
      reciter.arabicName = req.body.arabicName;
    }

    if (req.body.englishName) {
      reciter.englishName = req.body.englishName;
    }

    if (req.body.isTopReciter === "true") {
      const recitation = await Recitations.findOne({ slug: hafsAnAsim });

      const hasHafsAnAsimRecitation = reciter.recitations.some(
        (rec) => rec.recitationInfo.toString() === recitation._id.toString()
      );

      if (!hasHafsAnAsimRecitation) {
        return next(
          new AppError(
            "The reciter does not have `Hafs An Asim` recitation.",
            400
          )
        );
      }
    }
    reciter.isTopReciter = req.body.isTopReciter;

    // Save the reciter and handle any errors
    await reciter.save();

    res.status(200).json({
      status: "success",
      data: reciter,
    });
  } catch (err) {
    return next(
      new AppError(`Error during update reciter: ${err.message}`, 500)
    );
  }
});

exports.deleteReciter = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  const reciter = await Reciters.findOne({ slug }).populate({
    path: "recitations.recitationInfo",
    model: "Recitations",
  });

  if (!reciter) {
    return next(new AppError(`Reciter: ${slug} not found`, 404));
  }

  // delete audio files form Google Storage
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: `${reciter.slug}/` });

  if (files.length) {
    await Promise.all(files.map((file) => file.delete()));
  }

  // delete reciter photo if it's not default photo
  const photoPath = reciter.photo.split(`${bucketName}/`)[1];

  if (photoPath !== defaultPhotoPath) {
    await storage.bucket(bucketName).file(photoPath)?.delete();
  }

  // delete zip files
  if (reciter.recitations.length) {
    await Promise.all(
      reciter.recitations.map(async (rec) =>
        storage
          .bucket(bucketName)
          .file(`zip-files/${reciter.slug}/${rec.recitationInfo.slug}.zip`)
          .delete()
      )
    );
  }

  await Reciters.deleteOne({ slug });

  res.status(200).json({
    success: "reciter successfully deleted",
    data: {},
  });
});

exports.deleteRecitation = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;

  if (!reciterSlug) {
    return next(new AppError("Reciter slug is required", 400));
  }

  if (!recitationSlug) {
    return next(new AppError("Recitation slug is required", 400));
  }

  const isRecitationExists = await Recitations.findOne({
    slug: recitationSlug,
  });

  if (!isRecitationExists) {
    return next(new AppError(`Recitation: ${recitationSlug} not found`, 404));
  }

  const folderPath = `${reciterSlug}/${recitationSlug}`;
  const zipFilePath = `zip-files/${reciterSlug}/${recitationSlug}.zip`;

  const filter = {
    slug: reciterSlug,
    "recitations.recitationInfo": isRecitationExists._id,
  };

  const reciter = await Reciters.findOne(filter);

  if (!reciter) {
    return next(
      new AppError(
        `Recitation: ${recitationSlug} not found for the specified reciter`,
        404
      )
    );
  }

  // delete from GCS
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderPath });

  if (files.length) {
    await Promise.all(files.map((file) => file.delete()));
  }
  // delete from zip file
  await storage.bucket(bucketName).file(zipFilePath).delete();

  reciter.recitations = reciter.recitations.filter(
    (rec) =>
      rec.recitationInfo._id.toString() !== isRecitationExists._id.toString()
  );

  reciter.totalRecitations = Math.max(0, reciter.totalRecitations - 1);
  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});

exports.deleteSurah = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;
  const surahSlug = req.params.surahSlug;
  const audioName = req.params.audioName;

  if (!reciterSlug) return next(new AppError("Reciter slug is required", 400));

  if (!recitationSlug)
    return next(new AppError("Recitation slug is required", 400));

  if (!surahSlug) return next(new AppError("Surah slug is required", 400));

  const surah = await Surah.findOne({ slug: surahSlug });

  if (!surah) {
    return next(new AppError(`Surah: ${surahSlug} not found`, 404));
  }

  const isRecitationExists = await Recitations.findOne({
    slug: recitationSlug,
  });

  if (!isRecitationExists) {
    return next(new AppError(`Recitation: ${recitationSlug} not found`, 404));
  }

  const surahNumber = surah.number;

  const filter = {
    slug: reciterSlug,
    "recitations.recitationInfo": isRecitationExists._id,
    "recitations.audioFiles.surahInfo": surah._id,
  };

  const reciter = await Reciters.findOne(filter);
  if (!reciter) {
    return next(
      new AppError("Reciter not found or does not have this resource.", 404)
    );
  }

  // Remove from Google Cloud Storage
  const folderPath = `${reciterSlug}/${recitationSlug}/${audioName}`;

  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderPath });

  if (files.length) {
    await Promise.all(files.map((file) => file.delete()));
  }

  const recitation = reciter.recitations.find(
    (rec) =>
      rec.recitationInfo._id.toString() === isRecitationExists._id.toString()
  );

  // remove from mongoDB
  if (recitation) {
    recitation.audioFiles = recitation.audioFiles.filter(
      (audioFile) => audioFile.surahNumber.toString() !== surahNumber.toString()
    );
  }

  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});

exports.getRecitersMissingRecitations = asyncHandler(async (req, res, next) => {
  const recitersWithoutDownloadURL = await Reciters.aggregate([
    {
      $match: {
        "recitations.recitationInfo": { $exists: true },
      },
    },
    {
      $project: {
        arabicName: 1,
        englishName: 1,
        slug: 1,
        number: 1,
        recitations: {
          $filter: {
            input: "$recitations",
            as: "recitation",
            cond: { $not: { $ifNull: ["$$recitation.downloadURL", false] } },
          },
        },
      },
    },
    {
      $match: {
        "recitations.0": { $exists: true },
      },
    },
    {
      $project: {
        arabicName: 1,
        englishName: 1,
        slug: 1,
        number: 1,
      },
    },
    {
      $sort: {
        arabicName: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    size: recitersWithoutDownloadURL.length,
    reciters: recitersWithoutDownloadURL,
  });
});
