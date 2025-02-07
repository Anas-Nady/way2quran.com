import AppError from "../utils/appError";
import asyncHandler from "express-async-handler";
import Reciters, { IReciter } from "./../models/reciterModel";
import Recitations, { IRecitation } from "../models/recitationModel";
import Surah from "../models/surahModel";
import {
  storage,
  bucketName,
  defaultPhotoPath,
  cloudBaseUrl,
} from "./../config/googleStorage";
import {
  recitationsFilter,
  searchQuery,
  sortQuery,
} from "./../utils/recitationsQuery";
import { hafsAnAsim } from "../constants/recitationsTxt";
import redisClient from "../config/redisClient";
import uploadFileToGCS from "../utils/uploadFileToGCS";
import { Request } from "express";
import {
  deleteFileFromGCS,
  deleteFilesFromGCS,
} from "../utils/deleteFileFromGCS";

interface ReciterQuery {
  pageSize?: string;
  currentPage?: string;
  recitationSlug?: string;
  sort: string;
  search: string;
  isTopReciter?: string;
}

export const getAllReciters = asyncHandler(
  async (req: Request<{}, {}, {}, ReciterQuery>, res, next) => {
    const pageSize = Number(req.query.pageSize) || 50;
    const page = Number(req.query.currentPage) || 1;
    const recitationSlug = req.query.recitationSlug as string;

    const sortBy = sortQuery(req.query.sort);
    const search = searchQuery(req.query.search);
    const recitations = await recitationsFilter(recitationSlug);

    let isTopReciter;
    if (
      req.query.isTopReciter === "true" ||
      req.query.isTopReciter === "false"
    ) {
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
  }
);

export const getReciterInfo = asyncHandler(async (req, res, next) => {
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

export const createReciter = asyncHandler(async (req, res, next) => {
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
    const uploadPhoto = await uploadFileToGCS({
      fileToUpload: photo,
      folderName: "imgs",
      fileName: newReciter.slug as string,
    });
    if (uploadPhoto) {
      newReciter.photo = uploadPhoto.publicURL;
    }
  } else {
    newReciter.photo = `${cloudBaseUrl}/${bucketName}/${defaultPhotoPath}`;
  }

  await newReciter.save();

  res.status(201).json({
    status: "success",
    data: newReciter,
  });
});

export const getReciterDetails = asyncHandler(async (req, res, next) => {
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
    throw new AppError(
      `Reciter: '${slug}' not found. or does not have the recitation`,
      404
    );
  }

  if (increaseViews) {
    // Increment total viewers and save
    await Reciters.updateOne({ slug }, { $inc: { totalViewers: 1 } });
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

export const updateReciter = asyncHandler(async (req, res, next) => {
  try {
    const reciter: IReciter | null = await Reciters.findOne({
      slug: req.params.slug,
    });
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

        const uploadPhoto = await uploadFileToGCS({
          fileToUpload: photo,
          folderName: "imgs",
          fileName: reciter.slug as string,
        });

        // Set the new photo URL
        if (uploadPhoto) {
          reciter.photo = uploadPhoto.publicURL;
        }
      } catch (err: any) {
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
      const recitation = (await Recitations.findOne({
        slug: hafsAnAsim,
      })) as IRecitation;

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
  } catch (err: any) {
    throw new AppError(`Error during update reciter: ${err.message}`, 500);
  }
});

export const deleteReciter = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  const reciter: IReciter | null = await Reciters.findOne({ slug });

  if (!reciter) {
    return next(new AppError(`Reciter: ${slug} not found`, 404));
  }

  // delete audio files form Google Storage
  await deleteFilesFromGCS(`${reciter.slug}/`);

  // delete reciter photo if it's not default photo
  const photoPath = reciter.photo.split(`${bucketName}/`)[1];
  if (photoPath !== defaultPhotoPath) {
    await deleteFileFromGCS(photoPath);
  }

  // delete zip files
  if (reciter.recitations.length) {
    await Promise.all(
      reciter.recitations.map(async (rec) => {
        const getRecitation: IRecitation | null = await Recitations.findById(
          rec.recitationInfo
        );

        if (getRecitation) {
          await deleteFileFromGCS(
            `zip-files/${reciter.slug}/${getRecitation.slug}.zip`
          );
        }
      })
    );
  }

  await Reciters.deleteOne({ slug });

  res.status(200).json({
    success: "reciter successfully deleted",
    data: {},
  });
});

export const deleteRecitation = asyncHandler(async (req, res, next) => {
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
    throw new AppError(`Recitation: ${recitationSlug} not found`, 404);
  }

  const folderPath = `${reciterSlug}/${recitationSlug}`;
  const zipFilePath = `zip-files/${reciterSlug}/${recitationSlug}.zip`;

  const filter = {
    slug: reciterSlug,
    "recitations.recitationInfo": isRecitationExists._id,
  };

  const reciter: IReciter | null = await Reciters.findOne(filter);

  if (!reciter) {
    throw new AppError(
      `Recitation: ${recitationSlug} not found for the specified reciter`,
      404
    );
  }

  // delete audio Files
  await deleteFilesFromGCS(folderPath);
  // delete from zip file
  await deleteFileFromGCS(zipFilePath);

  reciter.recitations = reciter.recitations.filter(
    (rec) => rec.recitationInfo.toString() !== isRecitationExists._id.toString()
  );

  reciter.totalRecitations = Math.max(0, reciter.totalRecitations - 1);
  await reciter.save();

  res.status(200).json({
    message: "success",
  });
});

export const deleteSurah = asyncHandler(async (req, res, next) => {
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

  const isRecitationExists: IRecitation | null = await Recitations.findOne({
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

  const reciter: IReciter | null = await Reciters.findOne(filter);
  if (!reciter) {
    throw new AppError(
      "Reciter not found or does not have this resource.",
      404
    );
  }

  // Remove the audio file from Google Cloud Storage
  const folderPath = `${reciterSlug}/${recitationSlug}/${audioName}`;
  await deleteFileFromGCS(folderPath);

  const recitation = reciter.recitations.find(
    (rec) => rec.recitationInfo.toString() === isRecitationExists._id.toString()
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

export const getRecitersMissingRecitations = asyncHandler(
  async (req, res, next) => {
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
  }
);
