const mongoose = require("mongoose");

const mushafSchema = mongoose.Schema(
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

mushafSchema.index({ name: 1 });

const Mushaf = mongoose.model("Mushaf", mushafSchema);

module.exports = Mushaf;
