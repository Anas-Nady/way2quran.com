import mongoose, { Document, ObjectId, Schema } from "mongoose";
import slugify from "slugify";

export interface IVerse {
  id: number;
  textArabic: string;
  textEnglish: string;
}

export interface ISurah extends Document {
  _id: ObjectId;
  number: number;
  arabicName: string;
  englishName: string;
  slug: string;
  verses: IVerse[];
  pageNumber: number;
}

const surahSchema: Schema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
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
  },
  { timestamps: true }
);

surahSchema.index({ number: 1, slug: 1 });

surahSchema.pre<ISurah>("save", function (next) {
  this.slug = slugify(this.englishName, { lower: true });
  next();
});

const Surah = mongoose.model<ISurah>("Surah", surahSchema);

export default Surah;
