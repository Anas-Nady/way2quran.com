const QuranDownload = require("../models/quranDownloadModel.js");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError.js");

exports.incrementDownloadCount = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  let downloadRecord = await QuranDownload.findOne({ slug });

  if (!downloadRecord) {
    return next(new AppError(`Not Found quran pdf for ${slug}`, 404));
  }

  downloadRecord.totalDownloads++;
  await downloadRecord.save();

  res.status(200).json({
    success: true,
  });
});

exports.getAllDownloadCounts = asyncHandler(async (req, res) => {
  const counts = await QuranDownload.find({});

  res.status(200).json({ success: true, data: counts });
});
