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
    slug: { type: String, unique: true },
    photo: {
      type: String,
    },
    recitations: [
      {
        name: {
          type: String,
          default: "hafs-an-asim",
        },
        audioFiles: [
          {
            surah: {
              type: String,
              required: true,
              unique: true,
            },
            audioFile: { type: String, required: true, unique: true },
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

reciterSchema.pre("save", async function (next) {
  if (!this.number) {
    // Find the highest existing number
    const highestNumberReciter = await Reciter.findOne({}, { number: 1 })
      .sort({ number: -1 })
      .limit(1);

    console.log(highestNumberReciter);
    // Assign a new number greater than the highest existing number
    if (highestNumberReciter?.number) {
      this.number = highestNumberReciter.number + 1;
    } else {
      this.number = 1;
    }
  }

  this.slug = slugify(this.name, { lowercase: true });
  next();
});

const Reciter = mongoose.model("Reciter", reciterSchema);

module.exports = Reciter;
