import asyncHandler from "express-async-handler";
import AppError from "../utils/appError";
import Mushaf from "../models/mushafModel";

export const incrementDownloadCount = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  let downloadRecord = await Mushaf.findOne({ slug });

  if (!downloadRecord) {
    return next(new AppError(`Not Found quran pdf for ${slug}`, 404));
  }

  downloadRecord.totalDownloads++;
  await downloadRecord.save();

  res.status(200).json({
    success: true,
  });
});

export const getAllDownloadCounts = asyncHandler(async (req, res) => {
  const counts = await Mushaf.find({}).sort("-totalDownloads");

  res.status(200).json({ success: true, data: counts });
});
