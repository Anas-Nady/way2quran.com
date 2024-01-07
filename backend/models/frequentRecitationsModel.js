const mongoose = require("mongoose");
const slugify = require("slugify");

const frequentRecitationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name_ar: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      index: true,
    },
  },
  { timestamp: true }
);

frequentRecitationSchema.index({ slug: 1 }, { unique: true });

frequentRecitationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const FrequentRecitations = mongoose.model(
  "FrequentRecitations",
  frequentRecitationSchema
);
module.exports = FrequentRecitations;
