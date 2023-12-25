const AppError = require("./../utils/appError.js");
const Reciters = require("./../models/reciterModel.js");
const asyncHandler = require("express-async-handler");
const Reciter = require("./../models/reciterModel.js");
const { Storage } = require("@google-cloud/storage");
const Surah = require("../models/surahModel.js");
const FrequentRecitations = require("../models/frequentRecitationsModel.js");

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: `${__dirname}/../../cloud-configuration.json`,
});
const bucketName = "waytoquran_storage";

// @desc    Get reciters
// route    GET /api/reciters
// @access  Public
exports.getAllReciters = asyncHandler(async (req, res, next) => {
  const pageSize = Number(req.query.pageSize) || 20;
  const page = Number(req.query.pageNumber) || 1;

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

  let recitationFilter = {};
  if (req.query.recitationType) {
    recitationFilter =
      req.query.recitationType === "completed-recitations"
        ? {
            recitations: {
              $elemMatch: { name: "hafs-an-asim", audioFiles: { $size: 114 } },
            },
          }
        : req.query.recitationType === "various-recitations"
        ? {
            recitations: {
              $elemMatch: {
                name: "hafs-an-asim",
                audioFiles: { $not: { $size: 114 } },
              },
            },
          }
        : {
            recitations: {
              $elemMatch: { name: req.query.recitationType },
            },
          };
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
    .skip(pageSize * (page - 1));

  res.status(200).json({
    status: "success",
    data: {
      pagination: {
        totalCount: count,
        page,
        pages: Math.ceil(count / pageSize),
      },
      reciters,
    },
  });
});

// // @desc    Get reciter
// // route    GET /api/reciters/:id
// // @access  Public
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

// @desc    Create reciter
// route    POST /api/reciter
// @access  Private (protected, admin)
exports.createReciter = asyncHandler(async (req, res, next) => {
  const { name, name_ar } = req.body;
  const newReciter = await Reciter.create({ name, name_ar });

  if (!newReciter) {
    return next(new AppError("Invalid data received", 400));
  }

  const photo = req.file;

  if (photo) {
    // Upload photo to Google Cloud Storage
    const fileName = `imgs/${newReciter.slug}/${photo.originalname}`;
    const file = storage.bucket(bucketName).file(fileName);

    await file.save(photo.buffer, {
      metadata: {
        contentType: photo.mimetype,
      },
      public: true,
    });

    newReciter.photo = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  } else {
    newReciter.photo = `https://storage.googleapis.com/${bucketName}/imgs/default-reciter-photo.jpg`;
  }

  await newReciter.save();

  res.status(201).json({
    status: "success",
    data: newReciter,
  });
});

// @desc    upload Recitations of reciter after successful created
// @route   put /api/
// @access  Private (protected, admin)

exports.uploadRecitations = asyncHandler(async (req, res, next) => {
  const recitationType = req.body.name;
  const audioFiles = req.files;

  const reciter = await Reciters.findById(req.params.id);

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  let recitationToUpdate;
  let recitationIndex = reciter.recitations.findIndex(
    (recitation) => recitation.name === recitationType
  );

  if (recitationIndex >= 0) {
    recitationToUpdate = reciter.recitations[recitationIndex];
  } else {
    recitationToUpdate = {
      name: recitationType,
      audioFiles: [],
      isCompleted: false,
    };
  }

  if (!audioFiles || audioFiles.length === 0) {
    return next(new AppError("No audio files found in the request.", 400));
  }

  const uploadPromises = audioFiles.map(async (audioFile) => {
    const fileName = `${reciter.slug}/${recitationType}/${audioFile.originalname}`;
    const file = storage.bucket(bucketName).file(fileName);

    // Upload the audio file to Google Cloud Storage
    await file.save(audioFile.buffer, {
      metadata: {
        contentType: audioFile.mimetype,
      },
      public: true,
      resumable: false,
      timeout: 60000,
    });

    // Add the uploaded audio file to the recitation
    recitationToUpdate.audioFiles.push({
      surah: audioFile.originalname.split(".")[0],
      audioFile: `https://storage.googleapis.com/${bucketName}/${fileName}`,
      downloadUrl: file.metadata.mediaLink,
    });
  });

  // Wait for all uploads to complete before resolving the promise
  await Promise.all(uploadPromises);

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

// @desc    Delete reciter
// @route   DELETE /api/reciters/:id
// @access  Private (protected, admin)
exports.deleteReciter = asyncHandler(async (req, res, next) => {
  const reciter = await Reciters.findOneAndDelete({ slug: req.params.slug });

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  res.status(200).json({
    success: "reciter successfully deleted",
    data: {},
  });
});

// @desc    Get Top reciters
// @route   GET /api/reciters/top-reciters
// @access  Public
// exports.getTopReciters = asyncHandler(async (req, res, next) => {
//   const topReciters = await Reciters.find({ topReciter: true }).limit(8);

//   res.status(200).json({
//     message: "success",
//     data: topReciters,
//   });
// });

// exports.uploadRecitations = asyncHandler(async (req, res, next) => {
//   // const recitationType = req.body.recitationType;
//   // const bucketName = "my-bucket-name";
//   // const audioFiles = req.files;

//   const reciter = await Reciters.findById(req.params.id);

//   if (!reciter) {
//     return next(new AppError("Reciter not found", 404));
//   }

// find the recitation with the specified type
// let recitationToUpdate = reciter.recitations?.find(
//   (recitation) => recitation.type.toString() === recitationType
// );

// if (!recitationToUpdate) {
//   // If recitations array is empty or recitation type not found, create a new one
//   recitationToUpdate = {
//     type: recitationType,
//     audioFiles: [],
//     isCompletedRecitation: false,
//   };
// }

// if (reciter.recitations.length === 0) {
//   reciter.recitations.push(recitationToUpdate);
// } else {
//   // If recitations array is not empty, find the correct position to add the new recitation
//   const indexToInsert = reciter.recitations.findIndex(
//     (recitation) => recitation.type > recitationType
//   );

//   if (indexToInsert === -1) {
//     // If not found, push it to the end
//     reciter.recitations.push(recitationToUpdate);
//   } else {
//     // Insert at the correct position
//     reciter.recitations.splice(indexToInsert, 0, recitationToUpdate);
//   }
// }

//   // Upload audio files to Google Cloud Storage
//   const uploadPromises = audioFiles.map(async (audioFile) => {
//     const fileName = `${reciter.name}/${recitationToUpdate.slug}/${audioFile.originalname}`;
//     const file = storage.bucket(bucketName).file(fileName);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: audioFile.mimetype,
//         contentEncoding: "gzip",
//       },
//       public: true,
//     });

//     return new Promise((resolve, reject) => {
//       stream.on("error", (err) => {
//         console.error(err);
//         reject(
//           new AppError("Error uploading file to Google Cloud Storage", 500)
//         );
//       });

//       stream.on("finish", async () => {
//         // Add the uploaded audio file to the recitation
//         recitationToUpdate.audioFiles.push({
//           surah: audioFile.originalname.split(".")[0], // Replace with the actual surah ID
//           audioFile: `https://storage.googleapis.com/${bucketName}/${fileName}`,
//         });

//         resolve();
//       });

//       // Pipe the audio file stream to Google Cloud Storage
//       stream.end(audioFile.buffer);
//     });
//   });

//   // Wait for all uploads to complete
//   await Promise.all(uploadPromises);

//   if (recitationToUpdate.audioFiles.length === 114) {
//     recitationToUpdate.isCompleted = true;
//   }

//   // Save the updated reciter document
//   await reciter.save();

//   res.status(201).json({
//     status: "success",
//     data: reciter,
//   });
// });

// exports.updateReciter = asyncHandler(async (req, res, next) => {
//   const reciter = await Reciters.findById(req.params.id);

//   if (!reciter) {
//     return next(new AppError("No reciter has that ID", 404));
//   }

//   if (req.file) {
//     const bucketName = "my-bucket-name";
//     const fileName = `${reciter.name}/${req.file.originalname}`;
//     const file = storage.bucket(bucketName).file(fileName);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//       public: true,
//     });

//     stream.on("error", (err) => {
//       return next(
//         new AppError("Error uploading photo to Google Cloud Storage", 500)
//       );
//     });

//     stream.on("finish", async () => {
//       reciter.photo = `https://cloud.googleapis.com/${bucketName}${fileName}`;
//       await reciter.save();

//       res.status(200).json({
//         status: "success",
//         data: reciter,
//       });
//     });
//     stream.end(req.file.buffer);
//   }
//   reciter.name = req.body.name || reciter.name;
//   reciter.name_ar = req.body.name_ar || reciter.name_ar;
//   reciter.topReciter = req.body.topReciter || reciter.topReciter;
//   await reciter.save();

//   res.status(200).json({
//     status: "success",
//     data: reciter,
//   });
// });

exports.getReciterProfile = asyncHandler(async (req, res, next) => {
  const reciter = await Reciter.findOne({ slug: req.params.slug });
  const recitationType = req.params.recitationType;

  if (!reciter) {
    return next(new AppError("Reciter not found", 404));
  }

  const recitation = reciter.recitations.find(
    (recitation) => recitation.name === recitationType
  );

  if (!recitation) {
    return next(new AppError("recitation not found with that reciter", 404));
  }

  const audioFiles = recitation.audioFiles;
  const listSurahData = [];

  for (let i = 0; i < audioFiles.length; i++) {
    const surahInfo = await Surah.findOne({ number: audioFiles[i].surah });
    listSurahData.push({
      number: surahInfo.number,
      name: surahInfo.name_en,
      name_ar: surahInfo.name,
      translation: surahInfo.name_translation,
      slug: surahInfo.slug,
      url: audioFiles[i].audioFile,
      downloadUrl: audioFiles[i].downloadUrl,
    });
  }

  const reciterInfo = {
    name: reciter.name,
    name_ar: reciter.name_ar,
    photo: reciter.photo,
    topReciter: reciter.topReciter,
  };

  res.status(200).json({
    message: "success",
    reciterInfo,
    listSurahs: listSurahData,
  });
});

// exports.getRecitersBasedOnRecitationType = asyncHandler(async(req,res,next) => {
//   const recitationsType
// })
