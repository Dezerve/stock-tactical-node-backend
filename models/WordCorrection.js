const mongoose = require('mongoose');

const WordCorrectionSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
  sourceLang: {
    type: String,
  },
  targetLang: {
    type: String,
  },
});

module.exports = mongoose.model("WordCorrection", WordCorrectionSchema);
