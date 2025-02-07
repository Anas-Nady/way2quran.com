import mongoose, { Document, Schema } from "mongoose";

export interface IMushaf extends Document {
  arabicName: string;
  englishName: string;
  slug: string;
  downloadURL: string;
  imageURL: string;
  totalDownloads: number;
}

const mushafSchema: Schema = new mongoose.Schema(
  {
    arabicName: {
      type: String,
      required: true,
      unique: true,
    },
    englishName: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    downloadURL: {
      type: String,
      required: true,
      unique: true,
    },
    imageURL: {
      type: String,
      required: true,
      unique: true,
    },
    totalDownloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Mushaf = mongoose.model<IMushaf>("Mushaf", mushafSchema);

export default Mushaf;
