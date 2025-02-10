import Surah, { ISurah } from "../models/surahModel";
import asyncHandler from "express-async-handler";
import AppError from "../utils/appError";
import Reciters, { IReciter, IReciterRecitation } from "../models/reciterModel";
import Recitations, { IRecitation } from "../models/recitationModel";
import uploadFileToGCS from "../utils/uploadFileToGCS";
import { IUploadedFile } from "../types/types";

export const getAllRecitations = asyncHandler(async (req, res, next) => {
  const recitations = await Recitations.find({});

  if (!recitations) {
    throw new AppError("No recitations found.", 404);
  }

  res.status(200).json({
    status: "success",
    recitations,
  });
});

export const getRecitation = asyncHandler(async (req, res, next) => {
  const recitation = await Recitations.findOne({ slug: req.params.slug });

  if (!recitation) {
    throw new AppError("The recitation not found", 404);
  }

  res.status(200).json({
    status: "success",
    recitation,
  });
});

export const uploadZipFile = asyncHandler(async (req, res, next) => {
  const { reciterSlug, recitationSlug } = req.params;
  const zipFile = req.file;

  if (!reciterSlug || !recitationSlug) {
    throw new AppError("Reciter and recitation slugs are required", 400);
  }

  if (!zipFile || zipFile.mimetype !== "application/zip") {
    throw new AppError("Invalid file type. Only zip files are allowed", 400);
  }

  // check if the reciter has already recitation
  const reciter: IReciter | null = await Reciters.findOne({
    slug: reciterSlug,
  });

  if (!reciter) {
    throw new AppError(
      `Reciter: ${reciterSlug} does not exist have ${recitationSlug}`,
      404
    );
  }
  const checkRecitation: IRecitation | null = await Recitations.findOne({
    slug: recitationSlug,
  });

  if (!checkRecitation) {
    throw new AppError(`Invalid recitation name: ${recitationSlug}.`, 404);
  }

  const recitation: IReciterRecitation | undefined = reciter.recitations.find(
    (rec) => rec.recitationInfo.toString() === checkRecitation._id.toString()
  );

  if (!recitation) {
    throw new AppError(
      `Recitation: ${recitationSlug} does not exists for reciter: ${reciterSlug}`,
      404
    );
  }

  try {
    // Upload the zip file to Google Cloud Storage
    const uploadZipFile = await uploadFileToGCS({
      fileToUpload: zipFile,
      folderName: "zip-files",
      fileName: `${reciterSlug}/${recitationSlug}`,
    });

    if (uploadZipFile) {
      // Save the download URL to the recitation
      recitation.downloadURL = uploadZipFile.downloadURL;
    }

    await reciter.save();

    res.status(200).json({
      status: "success",
      message: "Recitation zip uploaded successfully",
    });
  } catch (error: any) {
    throw new AppError(`Failed to upload zip file: ${error.message}`, 500);
  }
});

export const uploadAudioFiles = asyncHandler(async (req, res, next) => {
  const recitationSlug = req.params.recitationSlug;
  const reciterSlug = req.params.reciterSlug;
  const audioFiles = req.files as IUploadedFile[];

  if (!recitationSlug) {
    throw new AppError("Recitation slug is required", 400);
  }

  if (!audioFiles || audioFiles.length === 0) {
    throw new AppError("No audio files found in the request.", 400);
  }

  const reciter: IReciter | null = await Reciters.findOne({
    slug: reciterSlug,
  });
  if (!reciter) {
    throw new AppError(`Reciter: ${reciterSlug} not found`, 404);
  }

  const isRecitationFound = await Recitations.findOne({ slug: recitationSlug });
  if (!isRecitationFound) {
    throw new AppError(`Invalid recitation name: ${recitationSlug}`, 400);
  }

  let recitationToUpdate: IReciterRecitation;
  let recitationIndex = reciter.recitations.findIndex(
    (rec: IReciterRecitation) =>
      rec.recitationInfo.toString() === isRecitationFound._id.toString()
  );

  if (recitationIndex >= 0) {
    recitationToUpdate = reciter.recitations[recitationIndex];
  } else {
    recitationToUpdate = {
      recitationInfo: isRecitationFound._id,
      audioFiles: [],
      isCompleted: false,
      totalDownloads: 0,
      downloadURL: undefined,
    };
  }

  const surahsList = await Surah.find({}).select("number");

  for (const audioFile of audioFiles) {
    const surahNumber = parseInt(audioFile.originalname.split(".")[0]);

    // validation
    const isSurahNumberValid = surahNumber >= 1 && surahNumber <= 144;
    if (!isSurahNumberValid) {
      throw new AppError(`Invalid surah number: ${surahNumber}`, 400);
    }

    const isSurahAlreadyExists = recitationToUpdate.audioFiles.some(
      (existingFile) => existingFile.surahNumber == surahNumber
    );

    if (isSurahAlreadyExists) continue;

    try {
      const currentSurah: ISurah | undefined = surahsList.find(
        (surah) => surah.number === surahNumber
      );

      if (!currentSurah) {
        return next(
          new AppError(
            `Surah is not exists or valid surah number: ${surahNumber}`,
            404
          )
        );
      }

      const uploadAudioFile = await uploadFileToGCS({
        fileToUpload: audioFile,
        folderName: `${reciter.slug}/${recitationSlug}`,
        fileName: audioFile.originalname.split(".")[0],
      });

      if (!uploadAudioFile) {
        return next(
          new AppError(
            `File upload failed: ${audioFile.originalname}. Try again`,
            500
          )
        );
      }

      // Add the uploaded audio file to the recitation
      recitationToUpdate.audioFiles.push({
        surahInfo: currentSurah._id,
        surahNumber: surahNumber,
        url: uploadAudioFile.publicURL,
        downloadUrl: uploadAudioFile.downloadURL,
      });
    } catch (err: any) {
      return next(
        new AppError(
          `Failed to upload ${audioFile.originalname} - ${err.message}`,
          err.statusCode
        )
      );
    }
  }

  // Sort the audioFiles based on the surah's name
  recitationToUpdate.audioFiles.sort((a, b) => a.surahNumber - b.surahNumber);

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

export const getRecitationsMissingDownloadURL = asyncHandler(
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
