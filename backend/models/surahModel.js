const mongoose = require("mongoose");
const slugify = require("slugify");

const surahSchema = mongoose.Schema({
  number: {
    type: String,
    required: true,
    index: true,
  },
  arabicName: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  slug: { type: String, index: true },
  verses: [{ id: Number, textArabic: String, textEnglish: String }],
  pageNumber: { type: Number, required: true },
});

surahSchema.index({ number: 1, slug: 1 });

surahSchema.pre("save", function (next) {
  this.slug = slugify(this.englishName, { lower: true });
  next();
});

const Surah = mongoose.model("Surah", surahSchema);

module.exports = Surah;
