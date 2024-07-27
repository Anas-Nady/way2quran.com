const mongoose = require("mongoose");
const slugify = require("slugify");

const recitationSchema = mongoose.Schema(
  {
    arabicName: {
      type: String,
      required: true,
    },
    englishName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
    totalListeners: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

recitationSchema.index({ slug: 1 }, { unique: true });

recitationSchema.pre("save", function (next) {
  if (this.isModified("englishName")) {
    this.slug = slugify(this.englishName, { lower: true });
  }
  next();
});

const Recitations = mongoose.model("Recitations", recitationSchema);
module.exports = Recitations;
