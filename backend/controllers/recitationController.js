const Surah = require("../models/surahModel");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const {
  storage,
  bucketName,
  cloudBaseUrl,
} = require("../config/googleStorage");
const Reciters = require("../models/reciterModel");
const Recitations = require("../models/recitationModel");
const archiver = require("archiver");

exports.getAllRecitations = asyncHandler(async (req, res, next) => {
  const recitations = await Recitations.find({});

  if (!recitations) {
    return next(new AppError("No recitations found.", 404));
  }

  res.status(200).json({
    status: "success",
    recitations,
  });
});

exports.getRecitation = asyncHandler(async (req, res, next) => {
  const recitation = await Recitations.findOne({ slug: req.params.slug });

  if (!recitation) {
    return next(new AppError("The recitation not found", 404));
  }

  res.status(200).json({
    status: "success",
    recitation,
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

  reciterRecitation.totalDownloads++;
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

exports.uploadZipFile = asyncHandler(async (req, res, next) => {
  const { reciterSlug, recitationSlug } = req.params;
  const zipFile = req.file;

  if (!reciterSlug || !recitationSlug) {
    return next(new AppError("Reciter and recitation slugs are required", 400));
  }

  if (!zipFile || zipFile.mimetype !== "application/zip") {
    return next(
      new AppError("Invalid file type. Only zip files are allowed", 400)
    );
  }

  // check if the reciter has already recitation
  const reciter = await Reciters.findOne({
    slug: reciterSlug,
  }).populate({
    path: "recitations.recitationInfo",
    model: "Recitations",
  });

  if (!reciter) {
    return next(
      new AppError(
        `Reciter: ${reciterSlug} does not exist have ${recitationSlug}`,
        404
      )
    );
  }

  const recitation = reciter.recitations.find(
    (rec) => rec.recitationInfo.slug === recitationSlug
  );

  if (!recitation) {
    return next(
      new AppError(
        `Recitation: ${recitationSlug} does not exists for reciter: ${reciterSlug}`,
        404
      )
    );
  }

  // TODO: Upload the zip file to Google Cloud Storage
  const zipFilePath = `zip-files/${reciterSlug}/${recitationSlug}.zip`;
  const newZipFile = storage.bucket(bucketName).file(zipFilePath);

  try {
    await newZipFile.save(zipFile.buffer, {
      metadata: {
        contentType: zipFile.mimetype,
      },
      public: true,
    });

    // Save the download URL to recitation
    recitation.downloadURL = `${newZipFile.metadata.mediaLink}`;

    await reciter.save();

    res.status(200).json({
      status: "success",
      message: "Recitation zip uploaded successfully",
    });
  } catch (error) {
    await newZipFile.delete();

    recitation.downloadURL = undefined;
    await reciter.save();
    return next(new AppError("Failed to upload zip file", error, 500));
  }
});

exports.uploadAudioFiles = asyncHandler(async (req, res, next) => {
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

exports.getRecitationsMissingDownloadURL = asyncHandler(
  async (req, res, next) => {
    const reciterSlug = req.params.reciterSlug;

    const recitationsWithoutDownloadURL = await Reciters.aggregate([
      {
        $match: {
          slug: reciterSlug,
        },
      },
      {
        $unwind: "$recitations",
      },
      {
        $match: {
          "recitations.downloadURL": { $exists: false }, // Filter recitations without downloadURL
        },
      },
      {
        $lookup: {
          from: "recitations", // Lookup the recitation collection using recitationInfo's ObjectId
          localField: "recitations.recitationInfo",
          foreignField: "_id",
          as: "recitationDetails", // Output as an array of recitation details
        },
      },
      {
        $unwind: "$recitationDetails", // Unwind the recitationDetails array to access the details directly
      },
      {
        $project: {
          arabicName: "$recitationDetails.arabicName", // Include arabicName from recitationDetails
          englishName: "$recitationDetails.englishName", // Include englishName from recitationDetails
          slug: "$recitationDetails.slug", // Include recitation's slug from recitationDetails
        },
      },
    ]);

    // Send response with recitations
    res.status(200).json({
      status: "success",
      recitations: recitationsWithoutDownloadURL,
    });
  }
);
