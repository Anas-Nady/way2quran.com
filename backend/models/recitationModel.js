const mongoose = require("mongoose");
const slugify = require("slugify");

const recitationSchema = mongoose.Schema(
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

recitationSchema.index({ slug: 1 }, { unique: true });

recitationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

const Recitations = mongoose.model("Recitations", recitationSchema);
module.exports = Recitations;
