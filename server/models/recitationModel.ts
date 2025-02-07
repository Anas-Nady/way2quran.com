import mongoose, { Document, ObjectId, Schema } from "mongoose";
import slugify from "slugify";

export interface IRecitation extends Document {
  _id: ObjectId;
  arabicName: string;
  englishName: string;
  slug: string;
  totalListeners: number;
}

const recitationSchema: Schema = new mongoose.Schema<IRecitation>(
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
  { timestamps: true }
);

recitationSchema.index({ slug: 1 }, { unique: true });

recitationSchema.pre<IRecitation>("save", function (next) {
  if (this.isModified("englishName")) {
    this.slug = slugify(this.englishName, { lower: true });
  }
  next();
});

const Recitations = mongoose.model<IRecitation>(
  "Recitations",
  recitationSchema
);
export default Recitations;
