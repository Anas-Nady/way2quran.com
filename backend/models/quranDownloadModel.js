const mongoose = require("mongoose");

const quranDownloadSchema = mongoose.Schema(
  {
    arabicName: {
      type: String,
      required: true,
      unique: true,
    },
    englishName: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    downloadURL: {
      type: String,
      required: true,
      unique: true,
    },
    imageURL: {
      type: String,
      required: true,
      unique: true,
    },
    totalDownloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

quranDownloadSchema.index({ name: 1 });

const QuranDownload = mongoose.model("QuranDownload", quranDownloadSchema);

module.exports = QuranDownload;
