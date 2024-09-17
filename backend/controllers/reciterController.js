const AppError = require("../utils/appError.js");
const asyncHandler = require("express-async-handler");
const Reciters = require("./../models/reciterModel.js");
const Recitations = require("../models/recitationModel.js");
const Surah = require("../models/surahModel.js");
const archiver = require("archiver");
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
    const fileExtension = photo.originalname.split(".").pop();
    // Upload photo to Google Cloud Storage
    const fileName = `imgs/${newReciter.slug}.${fileExtension}`;
    const file = storage.bucket(bucketName).file(fileName);

    await file.save(photo.buffer, {
      metadata: {
        contentType: photo.mimetype,
      },
      public: true,
      gzip: true,
    });

    newReciter.photo = `${cloudBaseUrl}/${bucketName}/${fileName}`;
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
    reciter,
    recitations: reciter.recitations,
  };

  // set the reciter's content in the cache.
  // the data will be stored indefinitely
  redisClient.set(`${slug}`, JSON.stringify(dataResponse));

  res.status(200).json({
    message: "success",
    ...dataResponse,
  });
});

exports.uploadRecitations = asyncHandler(async (req, res, next) => {
  const recitationSlug = req.params.recitationSlug;
  const reciterSlug = req.params.reciterSlug;
  const audioFiles = req.files;

  if (!recitationSlug) {
    return next(new AppError("Recitation slug is required", 400));
  }

  if (!audioFiles || audioFiles.length === 0) {
    return next(new AppError("No audio files found in the request.", 400));
  }

  const reciter = await Reciters.findOne({ slug: reciterSlug });
  if (!reciter) {
    return next(new AppError(`Reciter: ${reciterSlug} not found`, 404));
  }

  const isRecitationFound = await Recitations.findOne({ slug: recitationSlug });
  if (!isRecitationFound) {
    return next(
      new AppError(`Invalid recitation name: ${recitationSlug}`, 400)
    );
  }

  let recitationToUpdate;
  let recitationIndex = reciter.recitations.findIndex(
    (rec) => rec.recitationInfo.toString() === isRecitationFound._id.toString()
  );

  if (recitationIndex >= 0) {
    recitationToUpdate = reciter.recitations[recitationIndex];
  } else {
    recitationToUpdate = {
      recitationInfo: isRecitationFound._id,
      audioFiles: [],
      isCompleted: false,
      totalDownloads: 0,
    };
  }

  for (const audioFile of audioFiles) {
    const fileName = `${reciter.slug}/${recitationSlug}/${audioFile.originalname}`;
    const surahNumber = parseInt(audioFile.originalname.split(".")[0]);
    const file = storage.bucket(bucketName).file(fileName);

    // validation
    const isSurahNumberValid = surahNumber >= 1 && surahNumber <= 144;
    if (!isSurahNumberValid) {
      return next(new AppError(`Invalid surah number: ${surahNumber}`, 400));
    }

    const isSurahAlreadyExists = recitationToUpdate.audioFiles.some(
      (existingFile) => parseInt(existingFile.surahNumber) == surahNumber
    );

    if (isSurahAlreadyExists) {
      continue;
    }

    try {
      await file.save(audioFile.buffer, {
        metadata: {
          contentType: audioFile.mimetype,
        },
        public: true,
      });

      const currentSurah = await Surah.findOne({
        number: surahNumber,
      });

      // Add the uploaded audio file to the recitation
      recitationToUpdate.audioFiles.push({
        surahInfo: currentSurah._id,
        surahNumber: surahNumber,
        url: `${cloudBaseUrl}/${bucketName}/${fileName}`,
        downloadUrl: file.metadata.mediaLink,
      });
    } catch (err) {
      return next(
        new AppError(
          `Failed to upload ${audioFile.originalname} - ${err.message}`
        )
      );
    }
  }

  // Sort the audioFiles based on the surah's name
  recitationToUpdate.audioFiles.sort(
    (a, b) => parseInt(a.surahNumber) - parseInt(b.surahNumber)
  );

  if (recitationToUpdate.audioFiles.length === 114) {
    recitationToUpdate.isCompleted = true;
  }

  // Save the updated reciter document
  if (recitationIndex >= 0) {
    reciter.recitations[recitationIndex] = recitationToUpdate;
  } else {
    reciter.recitations.push(recitationToUpdate);
    reciter.totalRecitations += 1;
  }

  await reciter.save();

  res.status(200).json({
    status: "success",
    data: reciter,
  });
});

exports.downloadRecitation = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;
  const folderPath = `${reciterSlug}/${recitationSlug}`;

  const reciter = await Reciters.findOne({ slug: reciterSlug });
  if (!reciter) {
    return next(new AppError(`Reciter: ${reciterSlug} not found`, 400));
  }

  const recitation = await Recitations.findOne({
    slug: recitationSlug,
  });
  if (!recitation) {
    return next(
      new AppError(
        `Recitation: ${recitationSlug} not found with that slug`,
        400
      )
    );
  }

  const reciterRecitation = reciter.recitations.find(
    (rec) => rec.recitationInfo.toString() === recitation._id.toString()
  );
  if (!reciterRecitation) {
    return next(
      new AppError(`The reciter does not have: ${recitationSlug}.`, 400)
    );
  }

  reciterRecitation.numOfDownloads++;
  await reciter.save();

  // Initialize archiver
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  // Pipe the archive to the response stream
  archive.pipe(res);

  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderPath });

  // Filter files based on the folder structure
  const filteredFiles = files.filter((file) =>
    file.name.startsWith(`${folderPath}/`)
  );

  if (filteredFiles.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "No files found in the folder." });
  }

  filteredFiles.forEach((file) => {
    const fileReadStream = storage
      .bucket(bucketName)
      .file(file.name)
      .createReadStream();
    archive.append(fileReadStream, {
      name: file.name.replace(`${folderPath}/`, ""),
    });
  });

  // Finalize the archive after appending all files
  const zipFileName = `${folderPath}.zip`;
  res.setHeader("Content-Disposition", `attachment; filename="${zipFileName}"`);
  archive.finalize();
});

exports.updateReciter = asyncHandler(async (req, res, next) => {
  try {
    const reciter = await Reciters.findOne({ slug: req.params.slug });

    if (!reciter) {
      return next(new AppError("No reciter has that slug", 404));
    }

    if (req.file) {
      const fileExtension = req.file.originalname.split(".").pop();
      // Upload new photo
      const fileName = `imgs/${reciter.slug}.${fileExtension}`;
      const file = storage.bucket(bucketName).file(fileName);

      // check if the reciter has already photo
      const reciterPhoto =
        reciter.photo.split("way2quran_storage/")[1] || defaultPhotoPath;
      if (reciterPhoto !== defaultPhotoPath) {
        await storage.bucket(bucketName).file(reciterPhoto).delete();
      }
      // Upload new photo
      await file.save(req.file.buffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
        gzip: true,
        public: true,
      });

      reciter.photo = `${cloudBaseUrl}/${bucketName}/${fileName}`;
    }

    reciter.arabicName = req.body.arabicName || reciter.arabicName;
    reciter.englishName = req.body.englishName || reciter.englishName;

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
  const reciter = await Reciters.findOne({ slug });

  if (!reciter) {
    return next(new AppError(`Reciter: ${slug} not found`, 404));
  }

  // delete form Google Cloud Storage
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: `${reciter.slug}/` });

  if (files && files?.length > 0) {
    for (const file of files) {
      await file.delete();
    }
  }

  // delete reciter photo if it's not default photo
  const photoPath = reciter.photo?.split(`${bucketName}/`)[1];

  if (photoPath !== defaultPhotoPath) {
    const photoIsExist = storage.bucket(bucketName).file(photoPath);

    if (photoIsExist) await photoIsExist.delete();
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

  if (files.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "No files found in the folder." });
  }

  await Promise.all(
    files.map((file) => storage.bucket(bucketName).file(file.name).delete())
  );

  reciter.recitations = reciter.recitations.filter(
    (rec) =>
      rec.recitationInfo._id.toString() !== isRecitationExists._id.toString()
  );

  reciter.totalRecitations -= 1;
  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});

exports.deleteSurah = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;
  const surahSlug = req.params.surahSlug;

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
    return next(new AppError("Reciter not found", 404));
  }

  // Remove from Google Cloud Storage
  const folderPath = `${reciterSlug}/${recitationSlug}/${surahNumber}`;
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: folderPath });

  if (files.length > 0) {
    // Delete each file
    await Promise.all(
      files.map((file) => storage.bucket(bucketName).file(file.name).delete())
    );
  }

  const recitation = reciter.recitations.find(
    (rec) =>
      rec.recitationInfo._id.toString() === isRecitationExists._id.toString()
  );

  // remove from mongoDB
  if (recitation) {
    recitation.audioFiles = recitation.audioFiles.filter(
      (audioFile) => audioFile.surahNumber !== surahNumber
    );
  }

  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});
