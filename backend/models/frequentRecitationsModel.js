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
    },
    reciters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reciter" }],
  },
  { timestamp: true }
);

frequentRecitationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lowercase: true });
  }
  next();
});

const FrequentRecitations = mongoose.model(
  "FrequentRecitations",
  frequentRecitationSchema
);
module.exports = FrequentRecitations;
