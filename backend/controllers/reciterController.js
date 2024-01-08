const AppError = require("../utils/appError.js");
const Reciters = require("./../models/reciterModel.js");
const asyncHandler = require("express-async-handler");
const Reciter = require("./../models/reciterModel.js");
const Surah = require("../models/surahModel.js");
const Recitations = require("../models/recitationModel.js");
const {
  hafsAnAsim,
  completedRecitations,
  variousRecitations,
} = require("./../constants/recitationsTxt.js");
const {
  storage,
  bucketName,
  defaultPhotoPath,
  cloudBaseUrl,
} = require("./../db/cloud.js");
const archiver = require("archiver");
const buildRecitationFilter = require("./../utils/recitationsFilter.js");

exports.getAllReciters = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 50;
  const page = Number(req.query.pageNumber) || 1;
  const recitationTypeFromQuery = req.query.recitationType;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: new RegExp(req.query.keyword, "i"),
          },
          {
            name_ar: new RegExp(req.query.keyword, "i"),
          },
        ],
      }
    : {};

  const topReciter = req.query.topReciters
    ? {
        topReciter: req.query.topReciters,
      }
    : {};

  let recitationFilter = buildRecitationFilter(recitationTypeFromQuery);

  let recitation = {};

  if (recitationTypeFromQuery) {
    if (
      recitationTypeFromQuery == variousRecitations ||
      recitationTypeFromQuery == completedRecitations
    ) {
      recitation = await Recitations.findOne({
        slug: hafsAnAsim,
      });
    } else {
      recitation = await Recitations.findOne({
        slug: req.query.recitationType,
      });
    }
  }

  const count = await Reciters.countDocuments({
    ...keyword,
    ...topReciter,
    ...recitationFilter,
  });
  const reciters = await Reciters.find({
    ...keyword,
    ...topReciter,
    ...recitationFilter,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort("-number");

  res.status(200).json({
    status: "success",
    data: {
      pagination: {
        totalCount: count,
        page,
        pages: Math.ceil(count / pageSize),
      },
      reciters,
      recitation,
    },
  });
});

exports.getReciter = asyncHandler(async (req, res, next) => {
  const reciter = await Reciters.findOne({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: reciter,
  });
});

exports.createReciter = asyncHandler(async (req, res, next) => {
  const { name, name_ar, number } = req.body;

  if (number) {
    const isExists = await Reciter.findOne({ number });

    if (isExists) {
      return next(
        new AppError("The Number is already exists with another reciter", 400)
      );
    }
  }

  const newReciter = await Reciter.create({ name, name_ar, number });

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

exports.getReciterProfile = asyncHandler(async (req, res, next) => {
  const reciter = await Reciter.findOne({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  const reciterInfo = {
    name: reciter.name,
    name_ar: reciter.name_ar,
    photo: reciter.photo,
    slug: reciter.slug,
    topReciter: reciter.topReciter,
  };

  const recitationsAreExists =
    reciter.recitations && reciter.recitations.length > 0;

  let recitationsInfo = [];
  if (recitationsAreExists) {
    recitationsInfo = await Promise.all(
      reciter.recitations.map(async (recitation) => {
        const temp = await Recitations.findOne({
          slug: recitation.slug,
        });

        const recitationInfo = {
          name: temp?.name,
          name_ar: temp?.name_ar,
          slug: temp?.slug,
        };

        let listSurahData = await Promise.all(
          recitation.audioFiles.map(async (audioFile) => {
            let surahInfo = await Surah.findOne({ number: audioFile.surah });
            return {
              number: surahInfo.number,
              name: surahInfo.name,
              name_ar: surahInfo.name_ar,
              translation: surahInfo.name_translation,
              slug: surahInfo.slug,
              url: audioFile.audioFile,
              downloadUrl: audioFile.downloadUrl,
            };
          })
        );

        return {
          ...recitationInfo,
          listSurahData,
        };
      })
    );
  }

  res.status(200).json({
    message: "success",
    recitationsInfo,
    reciterInfo,
  });
});

exports.uploadRecitations = asyncHandler(async (req, res, next) => {
  const recitationType = req.body.recitationType;
  const audioFiles = req.files;

  const reciter = await Reciters.findOne({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  let recitationToUpdate;
  let recitationIndex = reciter.recitations.findIndex(
    (recitation) => recitation.slug === recitationType
  );

  if (recitationIndex >= 0) {
    recitationToUpdate = reciter.recitations[recitationIndex];
  } else {
    recitationToUpdate = {
      slug: recitationType,
      audioFiles: [],
      isCompleted: false,
    };
  }

  if (!audioFiles || audioFiles.length === 0) {
    return next(new AppError("No audio files found in the request.", 400));
  }

  const uploadPromises = audioFiles.map(async (audioFile, i) => {
    const fileName = `${reciter.slug}/${recitationType}/${audioFile.originalname}`;
    const file = storage.bucket(bucketName).file(fileName);

    // Create a writable stream for resumable upload
    const stream = file.createWriteStream({
      metadata: {
        contentType: audioFile.mimetype,
      },
      resumable: true,
      gzip: true,
    });

    // Handle errors during the upload
    stream.on("error", (err) => {
      console.error(`Error uploading file ${fileName}: ${err}`);
    });

    // Pipe the file buffer to the writable stream
    stream.end(audioFile.buffer);

    // Wait for the stream to finish (file to be uploaded)
    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        // Make the file public
        await file.makePublic();
        resolve();
      });
      stream.on("error", reject);
    });

    // Add the uploaded audio file to the recitation
    recitationToUpdate.audioFiles.push({
      surah: audioFile.originalname.split(".")[0],
      audioFile: `${cloudBaseUrl}/${bucketName}/${fileName}`,
      downloadUrl: file.metadata.mediaLink,
    });
  });

  await Promise.all(uploadPromises);

  // Sort the audioFiles based on the surah's name
  recitationToUpdate.audioFiles.sort(
    (a, b) => parseInt(a.surah) - parseInt(b.surah)
  );

  if (recitationToUpdate.audioFiles.length === 114) {
    recitationToUpdate.isCompleted = true;
  }

  // Save the updated reciter document
  if (recitationIndex >= 0) {
    reciter.recitations[recitationIndex] = recitationToUpdate;
  } else {
    reciter.recitations.push(recitationToUpdate);
  }

  await reciter.save();

  res.status(201).json({
    status: "success",
    data: reciter,
  });
});

exports.downloadRecitation = asyncHandler(async (req, res, next) => {
  const reciterSlug = req.params.reciterSlug;
  const recitationSlug = req.params.recitationSlug;
  const folderPath = `${reciterSlug}/${recitationSlug}`;

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
  const reciter = await Reciters.findOne({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("No reciter has that slug", 404));
  }

  try {
    if (req.file) {
      const fileExtension = req.file.originalname.split(".").pop();
      // Upload new photo
      const fileName = `imgs/${reciter.slug}.${fileExtension}`;
      const file = storage.bucket(bucketName).file(fileName);

      // check if the reciter has already photo
      const oldPhotoPath =
        reciter.photo.split("way2quran_storage/")[1] || defaultPhotoPath;
      if (oldPhotoPath !== defaultPhotoPath) {
        await storage.bucket(bucketName).file(oldPhotoPath).delete();
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

    reciter.name = req.body.name || reciter.name;
    reciter.name_ar = req.body.name_ar || reciter.name_ar;
    reciter.topReciter = req.body.topReciter || reciter.topReciter;

    // Save the reciter and handle any errors
    await reciter.save();

    res.status(200).json({
      status: "success",
      data: reciter,
    });
  } catch (err) {
    console.error("Error during updateReciter:", err);
    return next(new AppError("Internal server error", 500));
  }
});

exports.deleteReciterRecitation = asyncHandler(async (req, res, next) => {
  const { reciterSlug, recitationSlug } = req.params;
  const folderPath = `${reciterSlug}/${recitationSlug}`;

  const filter = {
    slug: reciterSlug,
    "recitations.slug": recitationSlug,
  };

  const reciter = await Reciter.findOne(filter);

  if (!reciter) {
    return next(
      new AppError("Recitation not found for the specified reciter", 404)
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
    (recitation) => recitation.slug !== recitationSlug
  );

  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});

exports.deleteReciterSurah = asyncHandler(async (req, res, next) => {
  const { reciterSlug, recitationSlug, surahSlug } = req.params;

  const surah = await Surah.findOne({ slug: surahSlug });

  if (!surah) {
    return next(new AppError("Surah not found", 404));
  }

  const surahNumber = surah.number;

  const filter = {
    slug: reciterSlug,
    "recitations.slug": recitationSlug,
    "recitations.audioFiles.surah": surahNumber,
  };

  const reciter = await Reciter.findOne(filter);

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  const recitation = reciter.recitations.find(
    (rec) => rec.slug === recitationSlug
  );

  // remove from mongoDB
  if (recitation) {
    recitation.audioFiles = recitation.audioFiles.filter(
      (audioFile) => audioFile.surah !== surahNumber
    );
  }

  await reciter.save();

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

  res.status(200).json({
    message: "success",
  });
});

exports.deleteReciter = asyncHandler(async (req, res, next) => {
  const reciter = await Reciters.findOneAndDelete({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  // delete form Google Cloud Storage
  const [files] = await storage
    .bucket(bucketName)
    .getFiles({ prefix: `${reciter.slug}/` });

  if (files?.length > 0) {
    for (const file of files) {
      await file.delete();
    }
  }

  // delete reciter photo if it's not default photo
  const photoPath = reciter.photo.split(`${bucketName}/`)[1];

  if (photoPath !== defaultPhotoPath) {
    await storage.bucket(bucketName).file(photoPath).delete();
  }

  res.status(200).json({
    success: "reciter successfully deleted",
    data: {},
  });
});
