const mongoose = require("mongoose");
const slugify = require("slugify");

const reciterSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      unique: true,
      index: true,
    },
    arabicName: {
      type: String,
      required: true,
      trim: true,
    },
    englishName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    photo: {
      type: String,
    },
    recitations: [
      {
        recitationInfo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recitations",
          required: true,
        },
        audioFiles: [
          {
            surahInfo: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Surah",
              required: true,
            },
            surahNumber: {
              type: Number,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
            downloadUrl: {
              type: String,
              required: true,
            },
          },
        ],
        isCompleted: {
          type: Boolean,
          default: false,
        },
        totalDownloads: {
          type: Number,
          default: 0,
        },
        downloadURL: {
          type: String,
        },
      },
    ],
    totalRecitations: {
      type: Number,
      default: 0,
    },
    isTopReciter: {
      type: Boolean,
      default: false,
    },
    totalViewers: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

reciterSchema.index({ number: 1, slug: 1 }, { unique: true });

reciterSchema.pre("save", async function (next) {
  if (!this.number) {
    // Skip the countDocuments query

    const highestNumberReciter = await Reciter.findOne({}, { number: 1 })
      .sort({ number: -1 })
      .limit(1);

    // Assign a new number greater than the highest existing number
    this.number = (highestNumberReciter?.number || 0) + 1;
  }

  if (!this.slug) {
    this.slug = slugify(this.englishName, { lower: true });
  }
  next();
});

const Reciter = mongoose.model("Reciter", reciterSchema);

module.exports = Reciter;
