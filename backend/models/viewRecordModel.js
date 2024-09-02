const mongoose = require("mongoose");

const viewRecordSchema = mongoose.Schema(
  {
    reference: {
      type: {
        type: String,
        enum: ["Reciter", "Recitation", "DownloadQuran"],
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    userIp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

viewRecordSchema.index({ userIp: 1, "reference.id": 1, "reference.type": 1 });

const ViewRecord = mongoose.model("ViewRecord", viewRecordSchema);

module.exports = ViewRecord;
