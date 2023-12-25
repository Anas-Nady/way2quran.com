const mongoose = require("mongoose");
const slugify = require("slugify");

const surahSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  name_en: {
    type: String,
    required: true,
  },
  name_translation: {
    type: String,
    required: true,
  },
  slug: { type: String },
  number: {
    type: String,
    required: true,
    unique: true,
  },
});

surahSchema.pre("save", function (next) {
  this.slug = slugify(this.name_translation, { lower: true });
  next();
});

surahSchema.pre("save", function (next) {
  this.number = this.number.padStart(3, "0");
  next();
});

const Surah = mongoose.model("Surah", surahSchema);

module.exports = Surah;
