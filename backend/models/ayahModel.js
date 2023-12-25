const mongoose = require("mongoose");

const ayahSchema = mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
});

const Ayah = mongoose.model("Ayah", ayahSchema);

module.exports = Ayah;
