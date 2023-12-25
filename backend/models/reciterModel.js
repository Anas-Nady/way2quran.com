const mongoose = require("mongoose");
const slugify = require("slugify");

const reciterSchema = new mongoose.Schema({
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
});

reciterSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lowercase: true });
  next();
});

const Reciter = mongoose.model("Reciter", reciterSchema);

module.exports = Reciter;
