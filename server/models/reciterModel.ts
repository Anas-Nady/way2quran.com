import mongoose, { Schema, Document, ObjectId } from "mongoose";
import slugify from "slugify";

export interface AudioFile {
  surahInfo: ObjectId;
  surahNumber: number;
  url: string;
  downloadUrl: string;
}

export interface IReciterRecitation {
  recitationInfo: ObjectId;
  audioFiles: AudioFile[];
  isCompleted: boolean;
  totalDownloads: number;
  downloadURL: string | undefined;
}

export interface IReciter extends Document {
  _id: ObjectId;
  number: number;
  arabicName: string;
  englishName: string;
  slug: string;
  photo: string;
  recitations: IReciterRecitation[];
  totalRecitations: number;
  totalViewers: number;
  isTopReciter: boolean;
}

const reciterSchema: Schema = new mongoose.Schema<IReciter>(
  {
    number: {
      type: Number,
      unique: true,
      index: true,
    },
    arabicName: {
      type: String,
      required: true,
      trim: true,
    },
    englishName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    photo: {
      type: String,
    },
    recitations: [
      {
        recitationInfo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recitations",
          required: true,
        },
        audioFiles: [
          {
            surahInfo: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Surah",
              required: true,
            },
            surahNumber: {
              type: Number,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
            downloadUrl: {
              type: String,
              required: true,
            },
          },
        ],
        isCompleted: {
          type: Boolean,
          default: false,
        },
        totalDownloads: {
          type: Number,
          default: 0,
        },
        downloadURL: {
          type: String,
        },
      },
    ],
    totalRecitations: {
      type: Number,
      default: 0,
    },
    isTopReciter: {
      type: Boolean,
      default: false,
    },
    totalViewers: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

reciterSchema.index({ number: 1, slug: 1 }, { unique: true });

reciterSchema.pre<IReciter>("save", async function (next) {
  if (!this.number) {
    const highestNumberReciter: IReciter[] = await Reciter.find({})
      .sort({ number: -1 })
      .limit(1)
      .select("number");

    // Assign a new number greater than the highest existing number
    this.number =
      highestNumberReciter.length > 0 ? highestNumberReciter[0].number + 1 : 1;
  }

  if (!this.slug) {
    this.slug = slugify(this.englishName, { lower: true });
  }
  next();
});

const Reciter = mongoose.model("Reciter", reciterSchema);

export default Reciter;
