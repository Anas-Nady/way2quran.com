const ViewRecord = require("../models/viewRecordModel.js");
const asyncHandler = require("express-async-handler");

exports.trackQuranDownload = asyncHandler(async (req, res) => {
  const userIp =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const pdfName = req.params.pdfName;

  // Check if the IP address has already downloaded this PDF
  const existingDownload = await ViewRecord.findOne({
    "reference.type": "DownloadQuran",
    "reference.id": pdfName,
    userIp,
  });

  if (!existingDownload) {
    await ViewRecord.create({
      "reference.type": "DownloadQuran",
      "reference.id": pdfName,
      userIp,
    });
  }

  res.status(200).json({
    success: true,
  });
});

exports.getQuranDownloadCounts = asyncHandler(async (req, res) => {
  const downloadCounts = await ViewRecord.aggregate([
    {
      $match: { "reference.type": "DownloadQuran" },
    },
    {
      $group: {
        _id: "$reference.id",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  res.status(200).json({ success: true, data: downloadCounts });
});
