const mongoose = require("mongoose");
const slugify = require("slugify");

const reciterSchema = new mongoose.Schema(
  {
    number: { type: Number, unique: true, index: true },
    name: { type: String, required: true },
    name_ar: {
      type: String,
      required: true,
    },
    slug: { type: String, unique: true, index: true },
    photo: {
      type: String,
    },
    recitations: [
      {
        slug: {
          type: String,
        },
        audioFiles: [
          {
            surah: {
              type: String,
              required: true,
            },
            audioFile: { type: String, required: true },
            downloadUrl: String,
          },
        ],
        isCompleted: Boolean,
      },
    ],
    topReciter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

reciterSchema.index({ number: 1, slug: 1 }, { unique: true });

reciterSchema.pre("save", async function (next) {
  if (!this.number) {
    // Check if it's the first reciter
    const count = await Reciter.countDocuments();

    if (count === 0) {
      this.number = 1;
    } else {
      // Find the highest existing number
      const highestNumberReciter = await Reciter.findOne({}, { number: 1 })
        .sort({ number: -1 })
        .limit(1);

      // Assign a new number greater than the highest existing number
      if (highestNumberReciter?.number) {
        this.number = highestNumberReciter.number + 1;
      } else {
        this.number = 1;
      }
    }
  }

  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Reciter = mongoose.model("Reciter", reciterSchema);

module.exports = Reciter;
